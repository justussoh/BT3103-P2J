import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {Router, Route, Switch} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import NavBar from "./components/Navigation/NavBar";
import SliderMenu from "./components/Navigation/SliderMenu";
import axios from "axios";
import {firebaseApp} from './util/firebase';
import history from "./history";

import QuestionInterface from './components/Question/QuestionInterface'

import './App.css';
import {questions} from "./QuestionList";
import Resume from "./components/Resume/Resume";

export interface BackendResponse {
    data: {
        htmlFeedback: string;
        isComplete: boolean;
        jsonFeedback: any;
        textFeedback: string;
    }
};

class App extends Component {

    state = {
        openMenu: false,
        question: 0, // idx of current question that user is on
        returnedData: null,
        questions: questions,
        feedbackRating: 0, // feedback rating out of 5
        isLoading: false,
        showAlert: false,
        showSnackBar: false,
        loggedIn:false,
        uid:'',
    };

    componentDidMount(): void {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                let currentuser = firebaseApp.auth().currentUser;
                if (currentuser !== null){
                    this.setState({
                        uid: currentuser.uid,
                        username: currentuser.displayName,
                        loggedIn: true,
                    });
                }
            } else {
                this.setState({loggedIn: false})
            }
        });
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
        history.push('/');
        this.setState({question: 1, openMenu: false,})
    };

    handleNextQuestion = () => {
        this.setState({question: this.state.question + 1, showAlert: false})
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

    handleCheckAnswer = async () => {
        //Add in fetch nonsense
        this.setState({isLoading: true});
        let gatewayURL = "https://cl8r4dbpqe.execute-api.us-east-1.amazonaws.com/Prod/";
        let questionURL = gatewayURL + `?question=${this.state.question}`;
        let answer = {
            "userToken": "ABCDE",
            "shown": {
                "0": `//main.spec.js \nconst app = require("./main");\ndescribe("Load app from main.js", () => {\n    it("works", () => {\nexpect(true).toBeTruthy();\n    }); \n});`
            },
            "editable": {
                "0": this.state.questions[this.state.question].answer
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
            console.log(res);
            let questions = this.state.questions;
            questions[this.state.question].completed = res.data.isComplete;
            questions[this.state.question].feedbackText = res.data.textFeedback;
            // questions[this.state.question].completed = true;
            this.setState({questions: questions});
            if (this.state.loggedIn){
                this.handleSaveState(this.state.uid)
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({isLoading: false, showAlert: true});
        }

    };

    handleSaveState = (name: string) => {
        let data = {
            questions: this.state.questions,
            userId: name,
            feedbackRating: this.state.feedbackRating,
        };
        firebaseApp.database().ref(`/userdata/${name}`).update(data)
    };

    handleLoadState = (name: string) => {
        let db = firebaseApp.database().ref(`/userdata/${name}`);
        db.once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data !== null){
                let questions = Object.values(data.questions);
                // console.log(questions)
                this.setState({
                    questions: questions,
                    feedbackRating: data.feedbackRating,
                    showSnackBar: true,
                    openMenu: false
                });
                window.setTimeout(() => {
                    this.setState({showSnackBar: false})
                }, 3000)
            }
        }).catch(err => {
            console.log(err);
        });
    };

    toggleAdmin = () => {
        const pw = prompt('Please enter password');
        if (pw === "richu") {
            const questions = this.state.questions;
            questions.forEach(q => {
                q.completed = true;
            });
            history.push('/');
            this.setState({questions: questions})
        }
    };

    toggleComplete = (isComplete: boolean) => {
        let questions = this.state.questions;
        questions[this.state.question].completed = isComplete;
        this.setState({questions: questions})
    };

    handleCloseSnackBar = () => {
        this.setState({showSnackBar: false})
    };

    SlideTransition = (props: any) => {
        return <Slide {...props} direction="up"/>
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
                />
                <Container fluid className='container-main d-flex align-items-center justify-content-center flex-column'
                           id='page-wrap'>
                    <NavBar handleMenu={this.handleMenu}/>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/"
                                   render={(props) => <QuestionInterface {...props} questions={this.state.questions}
                                                                         question={currQ} handleStart={this.handleStart}
                                                                         feedbackRating={this.state.feedbackRating}
                                                                         handleStartOver={this.handleStartOver}
                                                                         showAlert={this.state.showAlert}
                                                                         handleNextQuestion={this.handleNextQuestion}
                                                                         handlePrevQuestion={this.handlePrevQuestion}
                                                                         handleCheckAnswer={this.handleCheckAnswer}
                                                                         toggleComplete={this.toggleComplete}
                                                                         isLoading={this.state.isLoading}
                                                                         handleAlertClose={this.handleAlertClose}
                                                                         handleClickQuestion={this.handleClickQuestion}

                                   />}/>
                            <Route exact path='/load' render={(props) => <Resume {...props}
                                                                                handleSaveState={this.handleSaveState}
                                                                                handleLoadState={this.handleLoadState}
                            />}/>
                        </Switch>
                    </Router>
                    <Snackbar anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                              open={this.state.showSnackBar}
                              message={<span id="message-id">Profile has been successfully loaded.</span>}
                              action={
                                  <IconButton
                                      key="close"
                                      color="inherit"
                                      onClick={this.handleCloseSnackBar}
                                  >
                                      <CloseIcon/>
                                  </IconButton>
                              }
                              TransitionComponent={this.SlideTransition}
                    />
                </Container>
            </div>
        )
            ;
    }
}

export default App;
