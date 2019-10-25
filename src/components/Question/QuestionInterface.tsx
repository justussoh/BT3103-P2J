import React, {Component} from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import {Container, Col, Row, Alert} from 'react-bootstrap';

import {QuestionIface} from "../Form/Question";
import Question from "../Form/Question";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AceEditor from 'react-ace';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Grid from "@material-ui/core/Grid";
import CircleIcon from '@material-ui/icons/Lens';

import './QuestionInterface.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


type MyProps = {
    question: number,
    showAlert: boolean,
    isLoading: boolean,
    feedbackRating: number,
    questions: QuestionIface[],
    handleStart: () => void,
    handleStartOver: () => void,
    handleNextQuestion: () => void,
    handlePrevQuestion: () => void,
    handleCheckAnswer: () => void,
    toggleComplete: (arg0: boolean) => void,
    handleClickQuestion: (arg0: number) => void,
    handleAlertClose: () => void,

};

class QuestionInterface extends Component<MyProps, {}> {

    renderContent = () => {
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
                                mode="javascript"
                                theme="monokai"
                                name="info-section"
                                tabSize={0}
                                editorProps={{
                                    $blockScrolling: true,
                                }}
                                value={questions[currQ].questionText as string}
                                style={{maxWidth: 570}}
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
                                    this.setState({feedbackRating: newValue})
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

    render() {
        const questions = this.props.questions;
        const currQ = this.props.question;
        const listQuestions = this.props.questions.map((question, index) => {
            if (index === 0) {
                return null;
            } else {
                return (
                    <Tab key={index}
                         className={`d-flex align-items-center ${question.completed ? "hover-pointer" : "hover-cancel"}`}
                         label={
                             <div className='d-flex align-items-center'>
                                 {/* <CircleIcon style={{color: question.completed ? 'green' : 'red'}}/>*/}
                                 {/* <span style={{marginLeft: 10, color: "white"}}>*/}
                                 {/*{question.questionName}*/}
                                 {/*</span>*/}
                                 <div className='question-circle'
                                      style={{backgroundColor: !question.completed || index < currQ ? 'grey' : 'green'}}>{question.questionName.split(' ')[1]}</div>

                             </div>
                         }
                         disabled={index <= currQ}
                    />);
            }
        });

        return (
            <Container fluid className='container-main d-flex align-items-center justify-content-center flex-column'
                       id='page-wrap'>
                {currQ > 0 ?
                    <Row className='d-flex align-items-center justify-content-center'
                         style={{width: '80vw', marginBottom: 15}}>
                        <Tabs
                            value={currQ - 1}
                            onChange={(e, v) => {
                                if (questions[currQ].completed) {
                                    this.props.handleClickQuestion(v)
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
                    <Row className='d-flex align-items-center justify-content-center' style={{width: '80vw'}}>
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
                <Row className='d-flex align-items-center justify-content-center' style={{width: '80vw'}}>
                    <Col xs={10}>
                        {this.renderContent()}
                    </Col>
                </Row>
            </Container>

        );
    }
}

export default QuestionInterface;
