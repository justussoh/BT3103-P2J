import React, {Component} from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import {Container, Col, Row, Alert} from 'react-bootstrap';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {QuestionIface} from "../Form/Question";
import Question from "../Form/Question";
import PastAnswers from "../PastAnswers/PastAnswers";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AceEditor from 'react-ace';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './QuestionInterface.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


type MyProps = {
    question: number,
    showAlert: boolean,
    isLoading: boolean,

    // for feed
    feedbackRating: number,
    onFeedbackRatingChange: (feedbackRating: number) => void,

    questions: QuestionIface[],
    handleStart: () => void,
    handleStartOver: () => void,
    handleNextQuestion: () => void,
    handlePrevQuestion: () => void,
    handleCheckAnswer: () => void,
    toggleComplete: (arg0: boolean) => void,
    handleClickQuestion: (arg0: number) => void,
    handleAlertClose: () => void,
    saveState: () => void,
};

class QuestionInterface extends Component<MyProps, {}> {
    state = {
        showPastAnswers: false,
    };

    handlePastAnswerSwitch = (e: any) => {
        this.setState({showPastAnswers: e.target.checked})
    };


    renderQuestion = () => {
        const questions = this.props.questions;
        const currQ = this.props.question;
        switch (currQ) {
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
                                fontSize={16}
                                showPrintMargin={false}
                                mode="javascript"
                                theme="monokai"
                                name="info-section"
                                tabSize={0}
                                editorProps={{
                                    $blockScrolling: true,
                                }}
                                value={questions[currQ].questionText as string}
                            />
                        </div>
                        <Button variant="outlined" className='button-start ml-auto' size='large'
                                onClick={this.props.handleStart}>
                            START
                        </Button>
                    </div>
                );
            case questions.length:
                return (
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <Typist className='title-font'>
                            Congratulations on finishing the course
                        </Typist>
                        <p style={{marginBottom: 0}}>Please leave us a rating below</p>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="simple-controlled"
                                value={this.props.feedbackRating}
                                onChange={(event, newValue) => {
                                    this.props.onFeedbackRatingChange(newValue);
                                    // save rating to firebase
                                    this.props.saveState();
                                }}
                                size="large"
                                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color: "white"}}/>}
                            />
                        </Box>
                        <p>And also help us to complete a feedback form <a
                            href='https://docs.google.com/forms/d/e/1FAIpQLSfM35tbCqA1qp8Z95il-rWhtXZdLI_3orBRK8onNHISGxbYNQ/viewform?usp=sf_link'
                            className='feedback-link'>here</a>.</p>
                        <Button variant="outlined" className='button-start' size='large'
                                onClick={this.props.handleStartOver}>
                            START OVER
                        </Button>
                    </div>
                );
            default:
                return (
                    <Question question={questions[currQ]}
                              index={currQ}
                              nextQuestion={this.props.handleNextQuestion}
                              prevQuestion={this.props.handlePrevQuestion}
                              checkAnswer={this.props.handleCheckAnswer}
                              lastQuestion={currQ === questions.length - 1}
                              toggleComplete={this.props.toggleComplete}
                              isLoading={this.props.isLoading}/>

                );

        }
    };

    renderPastAnswers = () => {
        return <PastAnswers questions={this.props.questions}
                            question={this.props.question}/>
    };

    renderContent = () => {
        if (!this.state.showPastAnswers) {
            return this.renderQuestion()
        } else {
            return this.renderPastAnswers();
        }
    };

    render() {
        const questions = this.props.questions;
        const currQ = this.props.question;
        const listQuestions = this.props.questions.map((question, index) => {
            if (index === 0) {
                return null;
            }
            let className = 'question-circle';
            if (question.completed) {
                className += ' completed';
            }
            if (index === currQ) {
                className += ' current'
            }
            return (
                <Tab key={index}
                     className={`d-flex align-items-center`}
                     label={
                         <div className='d-flex align-items-center'>
                             <div className={className}>{index}</div>
                         </div>
                     }
                />);
        });

        return (
            <Container fluid>
                {currQ > 0 ?
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Tabs
                            value={currQ - 1}
                            onChange={(e, v) => {
                                if (questions[v + 1].completed) {
                                    this.props.handleClickQuestion(v + 1)
                                }
                            }}
                            textColor="primary"
                            variant='fullWidth'
                            centered
                            TabIndicatorProps={
                                {
                                    className: 'active-tab',
                                    style: {display: "none"}
                                }
                            }
                        >
                            {listQuestions}
                        </Tabs>
                    </Row> : ''}
                {this.props.showAlert ?
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Col xs={10}>
                            {this.props.questions[currQ].completed ?
                                <Alert variant='success' onClose={this.props.handleAlertClose} dismissible>
                                    You answered the question correctly! Please move on to the next question.
                                </Alert> :
                                <Alert variant='danger' onClose={this.props.handleAlertClose} dismissible>
                                    Please try again! You can use the hints if you need more help.
                                </Alert>
                            }
                        </Col>
                    </Row> : ''
                }
                {currQ > 0 ?
                    <Row className='d-flex align-items-center justify-content-center'>
                        <div className='d-flex align-items-center justify-content-center' style={{width: '80%', position:'relative'}}>
                            <h3 className='question-title'>{this.props.questions[currQ].questionTitle}</h3>
                            <FormGroup row style={{position:"absolute", right:0}}>
                                <FormControlLabel
                                    color="primary"
                                    control={
                                        <Switch checked={this.state.showPastAnswers}
                                                onChange={this.handlePastAnswerSwitch}
                                                value="showPastAnswers"/>
                                    }
                                    label="Show Past Answers"
                                    labelPlacement="start"
                                />
                            </FormGroup>
                        </div>
                    </Row>
                    : ''
                }
                <Row className='d-flex align-items-center justify-content-center'>
                    <Col xs={10}>
                        {this.renderContent()}
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default QuestionInterface;
