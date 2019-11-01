import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch, withRouter } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import SliderMenu from "./components/Navigation/SliderMenu";
import axios from "axios";
import { firebaseApp } from './util/firebase';
import { RouteComponentProps } from "react-router";

import QuestionInterface from './components/Question/QuestionInterface'

import './App.css';
import { questions } from "./QuestionList";
import Resume from "./components/Resume/Resume";
import { QuestionIface } from "./components/Form/Question";

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
                }
            } else {
                this.setState({ loggedIn: false })
            }
        });
    }

    handleMenu = (isOpen: boolean) => {
        this.setState({ openMenu: isOpen })
    };


    handleClickQuestion = (i: number) => {
        this.setState({
            openMenu: false,
            question: i,
            showAlert: false,
        });
    };

    handleMenuStateChange = (state: any) => {
        this.setState({ openMenu: state.isOpen })
    };

    handleStart = () => {
        this.props.history.push('/');
        this.setState({ question: 1, openMenu: false, })
    };

    handleNextQuestion = () => {
        this.setState({ question: this.state.question + 1, showAlert: false })
    };

    handlePrevQuestion = () => {
        this.setState({ question: this.state.question - 1, showAlert: false })
    };

    handleAlertClose = () => {
        this.setState({ showAlert: false })
    };

    handleStartOver = () => {
        // TODO clear progress of app
        this.setState({ question: 0 })
    };

    handleResetAnswer = () =>{
        let questions = this.state.questions;
        let question = questions[this.state.question];
        question.answer = question.defaultAnswer;
        this.setState({questions})
    };

    handleCheckAnswer = async () => {
        //Add in fetch nonsense
        this.setState({ isLoading: true });
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
            const res: BackendResponse = await axios.post(questionURL, { ...answer }, {
                headers: {
                    Accept: 'application/json',
                }
            });
            console.log(res);
            let questions = this.state.questions;
            questions[this.state.question].completed = res.data.isComplete;
            questions[this.state.question].feedbackText = res.data.htmlFeedback;
            questions[this.state.question].pastAnswers.push({
                pass: res.data.isComplete,
                pastAnswer: questions[this.state.question].answer,
                errorMessage: res.data.htmlFeedback,
            });

            this.setState({ questions: questions });
            if (this.state.loggedIn) {
                this.handleSaveState();
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ isLoading: false, showAlert: true });
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
        firebaseApp.database().ref(`/userdata/${name}`).update(data)
        console.log("saved data to firebase!")
    };

    handleLoadState = () => {
        const name = this.state.uid;
        let db = firebaseApp.database().ref(`/userdata/${name}`);
        db.once('value').then((snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                let questions: QuestionIface[] = Object.values(data.questions);
                for (let q of questions) {
                    if (q.pastAnswers) { q.pastAnswers = Object.values(q.pastAnswers); }
                }
                this.setState({
                    questions: questions,
                    feedbackRating: data.feedbackRating,
                    question: data.currentQuestion
                });
                // close menu and open snackbar
                this.setState({
                    showSnackBar: true,
                    openMenu: false,
                })
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
        this.setState({ questions: questions })
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
                    onUserIDChange={(name) => { this.setState({ uid: name }) }}
                />
                <Container fluid className='container-main d-flex align-items-center justify-content-center flex-column'
                    id='page-wrap'>

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
                                handleResetAnswer={this.handleResetAnswer}
                                toggleComplete={this.toggleComplete}
                                isLoading={this.state.isLoading}
                                handleAlertClose={this.handleAlertClose}
                                handleClickQuestion={this.handleClickQuestion}
                                saveState={this.handleSaveState}
                                onFeedbackRatingChange={(n) => { this.setState({ feedbackRating: n }); }}

                            />} />
                        <Route exact path='/load' render={(props) => <Resume {...props}
                            handleSaveState={this.handleSaveState}
                            handleLoadState={this.handleLoadState}
                            userID={this.state.uid}
                            onUserIDChange={(name) => { this.setState({ uid: name }) }}
                        />} />
                    </Switch>
                    <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        open={this.state.showSnackBar}
                        autoHideDuration={3000}
                        onClose={() => { this.setState({ showSnackBar: false }) }}
                        message={<span id="message-id">Profile has been successfully loaded.</span>}
                        action={
                            <IconButton
                                key="close"
                                color="inherit"
                                onClick={() => { this.setState({ showSnackBar: false }) }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        TransitionComponent={(props) => { return <Slide {...props} direction="up" /> }}
                    />
                </Container>
            </div>
        )
            ;
    }
}

export default withRouter(App);
