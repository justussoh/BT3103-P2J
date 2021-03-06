import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Route, Switch, withRouter} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import SliderMenu from "./components/Navigation/SliderMenu";
import axios from "axios";
import {firebaseApp} from './util/firebase';
import {RouteComponentProps} from "react-router";
import QuestionInterface from './components/Question/QuestionInterface'
import './App.css';
import {questions} from "./QuestionList";
import Resume from "./components/Resume/Resume";
import {QuestionIface} from "./components/Form/Question";
import Signup from "./components/SignupPage/Signup";
import Home from "./components/Home/Home";
import About from "./components/About/About";

export interface BackendResponse {
    data: {
        htmlFeedback: string;
        isComplete: boolean;
        jsonFeedback: any;
        textFeedback: string;
    }
};

class App extends Component<RouteComponentProps> {

    state = {
        openMenu: false,
        question: 0, // idx of current question that user is on
        returnedData: null,
        questions: questions,
        feedbackRating: 0, // feedback rating out of 5
        isLoading: false,
        showAlert: false,
        showSnackBar: false,
        loggedIn: false,
        uid: '',
        timeVisited: new Date(),
    };

    componentDidMount(): void {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                let currentuser = firebaseApp.auth().currentUser;
                if (currentuser !== null) {
                    this.setState({
                        uid: currentuser.uid,
                        username: currentuser.displayName,
                        loggedIn: true,
                    });
                    this.handleLoadState(true)
                }
            } else {
                this.setState({loggedIn: false})
            }
        });
        let questions = this.state.questions;
        if (questions[0].startDateTime === null) {
            questions[0].startDateTime = this.state.timeVisited;
        }
        this.setState({questions});
    }

    handleMenu = (isOpen: boolean) => {
        this.setState({openMenu: isOpen})
    };


    handleClickQuestion = (i: number) => {
        this.setState({
            openMenu: false,
            question: i,
            showAlert: false,
        });
    };

    handleMenuStateChange = (state: any) => {
        this.setState({openMenu: state.isOpen})
    };

    handleStart = () => {
        if (this.state.loggedIn) {
            this.props.history.push('/questions');
            let questions = this.state.questions;
            if (questions[1].startDateTime === null) {
                questions[1].startDateTime = new Date();
            }
            this.handleSaveState();
            this.setState({question: 1, openMenu: false, questions: questions})
        } else{
            this.props.history.push('/signup');
        }
    };

    handleNextQuestion = () => {
        this.setState({question: this.state.question + 1, showAlert: false});
        let questions = this.state.questions;
        if (this.state.question === this.state.questions.length - 1 && this.state.questions[0].completedDateTime === null) {
            questions[0].completedDateTime = new Date();
        } else if (questions[this.state.question].startDateTime === null) {
            questions[this.state.question].startDateTime = new Date();
        }
        this.setState({questions: questions});
        window.setTimeout(() => {
            if (this.state.loggedIn) {
                this.handleSaveState();
            }
        }, 1000)
    };

    handlePrevQuestion = () => {
        this.setState({question: this.state.question - 1, showAlert: false})
    };

    handleAlertClose = () => {
        this.setState({showAlert: false})
    };

    handleStartOver = () => {
        // TODO clear progress of app
        this.setState({question: 0})
    };

    handleResetAnswer = () => {
        let questions = this.state.questions;
        let question = questions[this.state.question];
        question.answer = question.defaultAnswer;
        this.setState({questions})
    };

    handleCheckAnswer = async () => {
        //Add in fetch nonsense
        this.setState({isLoading: true, showAlert: false});
        let gatewayURL = "https://cl8r4dbpqe.execute-api.us-east-1.amazonaws.com/Prod/";
        let questionURL = gatewayURL + `?question=${this.state.question}`;
        let answer = {
            "userToken": "ABCDE",
            "shown": {
                "0": this.state.questions[this.state.question].testCode
            },
            "editable": {
                "0": this.state.questions[this.state.question].answer + this.state.questions[this.state.question].exportCode
            },
            "hidden": {
                "0": `{\n"scripts":{ "test":"jest" }\n}`,
            }
        };
        try {
            const res: BackendResponse = await axios.post(questionURL, {...answer}, {
                headers: {
                    Accept: 'application/json',
                }
            });
            let questions = this.state.questions;
            questions[this.state.question].completed = res.data.isComplete;
            questions[this.state.question].feedbackText = res.data.htmlFeedback;
            questions[this.state.question].pastAnswers.push({
                pass: res.data.isComplete,
                pastAnswer: questions[this.state.question].answer,
                errorMessage: res.data.htmlFeedback,
            });
            if (questions[this.state.question].completedDateTime === null && res.data.isComplete) {
                questions[this.state.question].completedDateTime = new Date();
            }

            // update firebase with attempt statistics
            let db = firebaseApp.database().ref(`/logging/${this.state.question}`);
            await db.once('value').then((snapshot) => {
                let data = snapshot.val();
                if (data !== null) {
                    data.totalTries += 1;
                    if (res.data.isComplete) {
                        data.correctAnswer += 1;
                    } else {
                        data.wrongAnswer += 1;
                    }
                } else {
                    if (res.data.isComplete) {
                        data = {
                            correctAnswer: 1,
                            wrongAnswer: 0,
                            totalTries: 1,
                        }
                    } else {
                        data = {
                            correctAnswer: 0,
                            wrongAnswer: 1,
                            totalTries: 1,
                        }
                    }
                }
                db.update(data);
            }).catch(err => {
                console.error(err);
            });

            this.setState({questions: questions});
            if (this.state.loggedIn) {
                this.handleSaveState();
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({isLoading: false, showAlert: true});
        }

    };

    handleSaveState = () => {
        const name = this.state.uid;
        let data = {
            questions: this.state.questions,
            userId: name,
            feedbackRating: this.state.feedbackRating,
            currentQuestion: this.state.question,
        };
        firebaseApp.database().ref(`/userdata/${name}`).update(data);
        this.setState({loggedIn: true});
        // window.setTimeout(() => this.handleLoadState(false), 1000);
        // this.props.history.push('/');
        console.log("saved data to firebase!")
    };

    handleLoadState = (showSnackBar: boolean) => {
        const name = this.state.uid;
        let db = firebaseApp.database().ref(`/userdata/${name}`);
        db.once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                let questions: QuestionIface[] = Object.values(data.questions);
                for (let q of questions) {
                    if (q.pastAnswers) {
                        q.pastAnswers = Object.values(q.pastAnswers);
                    } else {
                        q.pastAnswers = [];
                    }
                    if (!q.completedDateTime) {
                        q.completedDateTime = null
                    }
                    if (!q.startDateTime) {
                        q.startDateTime = null
                    }
                }
                this.setState({
                    questions: questions,
                    feedbackRating: data.feedbackRating,
                    question: data.currentQuestion,
                    loggedIn: true
                });
                // close menu and open snackbar
                if (showSnackBar) {
                    this.setState({
                        showSnackBar: true,
                        openMenu: false,
                    });
                }
                this.props.history.push('/');
            }
        }).catch(err => {
            console.error(err);
        });
    };

    toggleAdmin = () => {
        const pw = prompt('Please enter password');
        if (pw === "richu") {
            const questions = this.state.questions;
            questions.forEach(q => {
                q.completed = true;
            });
            this.props.history.push('/');
            this.setState({
                questions: questions,
                question: 1,
                openMenu: false
            });
        }
    };

    toggleComplete = (isComplete: boolean) => {
        let questions = this.state.questions;
        questions[this.state.question].completed = isComplete;
        if (isComplete) {
            questions[this.state.question].completedDateTime = new Date();
        }
        this.setState({questions: questions})
    };

    onUserIDChange = (name: string) => {
        this.setState({uid: name})
    };

    render() {
        const currQ = this.state.question;
        return (
            <div className="App">
                <SliderMenu open={this.state.openMenu} handleMenu={this.handleMenu}
                            handleMenuStateChange={this.handleMenuStateChange}
                            handleClickQuestion={this.handleClickQuestion}
                            handleStart={this.handleStart}
                            questions={this.state.questions}
                            question={currQ}
                            toggleAdmin={this.toggleAdmin}
                            handleSaveState={this.handleSaveState}
                            handleLoadState={this.handleLoadState}
                            userID={this.state.uid}
                            onUserIDChange={this.onUserIDChange}
                />
                <Container fluid className='d-flex align-items-center justify-content-center flex-column p-5 h-100'
                           id='page-wrap'>

                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} questions={this.state.questions}
                                                                       loggedIn={this.state.loggedIn}
                                                                       handleStart={this.handleStart}
                        />}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/questions"
                               render={(props) => <QuestionInterface {...props} questions={this.state.questions}
                                                                     question={currQ} handleStart={this.handleStart}
                                                                     feedbackRating={this.state.feedbackRating}
                                                                     handleStartOver={this.handleStartOver}
                                                                     showAlert={this.state.showAlert}
                                                                     handleNextQuestion={this.handleNextQuestion}
                                                                     handlePrevQuestion={this.handlePrevQuestion}
                                                                     handleCheckAnswer={this.handleCheckAnswer}
                                                                     handleResetAnswer={this.handleResetAnswer}
                                                                     toggleComplete={this.toggleComplete}
                                                                     isLoading={this.state.isLoading}
                                                                     handleAlertClose={this.handleAlertClose}
                                                                     handleClickQuestion={this.handleClickQuestion}
                                                                     saveState={this.handleSaveState}
                                                                     onFeedbackRatingChange={(n) => {
                                                                         this.setState({feedbackRating: n});
                                                                     }}
                                                                     loggedIn={this.state.loggedIn}

                               />}/>
                        <Route exact path='/load' render={(props) => <Resume {...props}
                                                                             handleSaveState={this.handleSaveState}
                                                                             handleLoadState={this.handleLoadState}
                                                                             userID={this.state.uid}
                                                                             onUserIDChange={this.onUserIDChange}
                        />}/>
                        <Route exact path='/signup' render={(props) => <Signup {...props}
                                                                               handleSaveState={this.handleSaveState}
                                                                               onUserIDChange={this.onUserIDChange}
                                                                               userID={this.state.uid}
                                                                               handleStart={this.handleStart}
                        />}/>
                    </Switch>
                    {this.state.showSnackBar ?
                        <Snackbar anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                  open={this.state.showSnackBar}
                                  autoHideDuration={3000}
                                  onClose={() => {
                                      this.setState({showSnackBar: false})
                                  }}
                                  message={<span id="message-id">Profile has been successfully loaded.</span>}
                                  action={
                                      <IconButton
                                          key="close"
                                          color="inherit"
                                          onClick={() => {
                                              this.setState({showSnackBar: false})
                                          }}
                                      >
                                          <CloseIcon/>
                                      </IconButton>
                                  }
                                  TransitionComponent={(props) => {
                                      return <Slide {...props} direction="up"/>
                                  }}
                        /> : ""
                    }
                </Container>
            </div>
        )
            ;
    }
}

export default withRouter(App);
