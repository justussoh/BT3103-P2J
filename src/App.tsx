import React, {Component} from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import {Container, Col, Row, Alert} from 'react-bootstrap';
import NavBar from "./components/Navigation/NavBar";
import Question from "./components/Form/Question";
import SliderMenu from "./components/Navigation/SliderMenu";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AceEditor from 'react-ace';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from "axios";

import 'brace/mode/javascript';
import 'brace/theme/monokai';


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
        question: 0,
        returnedData: null,
        questions: questions,
        feedbackRating: 0,
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
            showAlert:false,
        });
    };

    handleMenuStateChange = (state: any) => {
        this.setState({openMenu: state.isOpen})
    };

    handleStart = () => {
        this.setState({question: 1, openMenu: false,})
    };

    handleNextQuestion = () => {
        this.setState({question: this.state.question + 1, showAlert:false})
    };

    handlePrevQuestion = () => {
        this.setState({question: this.state.question - 1, showAlert:false})
    };
    handleAlertClose = () => {
        this.setState({showAlert: false})
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

    renderContent = () => {
        switch (this.state.question) {
            case 0:
                return (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <Typist className='title-font'>
                            Learn how to script in JavaScript from Python!
                        </Typist>
                        <div className='d-flex align-items-center justify-content-center flex-column'
                             style={{marginTop: '25px'}}>
                            <AceEditor
                                readOnly={false}
                                wrapEnabled
                                height='50vh'
                                width='70vw'
                                mode="javascript"
                                theme="monokai"
                                name="info-section"
                                tabSize={0}
                                editorProps={{
                                    $blockScrolling: true,
                                }}
                                value={this.state.questions[this.state.question].questionText}
                                style={{maxWidth: 570}}
                            />
                        </div>
                        <Button variant="outlined" className='button-start ml-auto' size='large'
                                onClick={this.handleStart}>
                            START
                        </Button>
                    </div>
                );
            case this.state.questions.length:
                return (
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <Typist className='title-font'>
                            Congratulations on finishing the course
                        </Typist>
                        <p style={{marginBottom: 0}}>Please leave us a rating below</p>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="simple-controlled"
                                value={this.state.feedbackRating}
                                onChange={(event, newValue) => {
                                    this.setState({feedbackRating: newValue})
                                }}
                                size="large"
                                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color: "white"}}/>}
                            />
                        </Box>
                        <p>And also help us to complete a feedback form <a
                            href='https://docs.google.com/forms/d/e/1FAIpQLSfM35tbCqA1qp8Z95il-rWhtXZdLI_3orBRK8onNHISGxbYNQ/viewform?usp=sf_link'
                            className='feedback-link'>here</a>.</p>
                    </div>
                );
            default:
                return (
                    <Question question={this.state.questions[this.state.question]}
                              index={this.state.question}
                              nextQuestion={this.handleNextQuestion}
                              prevQuestion={this.handlePrevQuestion}
                              checkAnswer={this.handleCheckAnswer}
                              lastQuestion={this.state.question === this.state.questions.length - 1}
                              isLoading={this.state.isLoading}/>

                );

        }
    };

    render() {
        return (
            <div className="App">
                <SliderMenu open={this.state.openMenu} handleMenu={this.handleMenu}
                            handleMenuStateChange={this.handleMenuStateChange}
                            handleClickQuestion={this.handleClickQuestion}
                            handleStart={this.handleStart}
                            questions={this.state.questions}
                            question={this.state.question}
                />
                <Container fluid className='container-main d-flex align-items-center justify-content-center flex-column'
                           id='page-wrap'>
                    <NavBar handleMenu={this.handleMenu}/>
                    {this.state.showAlert ?
                        <Row className='d-flex align-items-center justify-content-center' style={{width: '80vw'}}>
                            <Col xs={10}>
                                {this.state.questions[this.state.question].completed ?
                                    <Alert variant='success' onClose={this.handleAlertClose} dismissible>
                                        You answered the question correctly! Please move on to the next question.
                                    </Alert> :
                                    <Alert variant='danger' onClose={this.handleAlertClose} dismissible>
                                        Please try again! You can use the hints if you need more help.
                                    </Alert>
                                }
                            </Col>
                        </Row> : ''

                    }
                    <Row className='d-flex align-items-center justify-content-center' style={{width: '80vw'}}>
                        <Col xs={10}>
                            {this.renderContent()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
