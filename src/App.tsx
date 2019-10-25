import React, {Component} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from "./components/Navigation/NavBar";
import SliderMenu from "./components/Navigation/SliderMenu";
import axios from "axios";

import QuestionInterface from './components/Question/QuestionInterface'

import './App.css';
import {questions} from "./QuestionList";

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
    };

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
            this.setState({questions: questions})
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({isLoading: false, showAlert: true});
        }

    };

    toggleAdmin = () => {
        const pw = prompt('Please enter password');
        if (pw === "richu") {
            const questions = this.state.questions
            questions.forEach(q => {
                q.completed = true;
            });
            this.setState({questions: questions})
        }
    };

    toggleComplete = (isComplete: boolean) => {
        let questions = this.state.questions;
        questions[this.state.question].completed = isComplete;
        this.setState({questions: questions})
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
                />
                <Container fluid className='container-main d-flex align-items-center justify-content-center flex-column'
                           id='page-wrap'>
                    <NavBar handleMenu={this.handleMenu}/>
                    <Router>
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

                                   />}/>
                        </Switch>
                    </Router>
                </Container>
            </div>
        );
    }
}

export default App;
