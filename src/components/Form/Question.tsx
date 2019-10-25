import React from 'react';
import './Question.css';
import AceEditor from "react-ace";
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Button from "@material-ui/core/Button";
import { Container, Col, Row, OverlayTrigger, Tooltip, ProgressBar } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelpIcon from '@material-ui/icons/HelpOutline';

export interface QuestionIface {
    questionName: string,
    questionTitle: string,
    questionTutorial: string,
    questionText: string | string[],
    hint: string,
    answer: string | number | number[],
    feedbackText: string,
    completed: boolean
    type: QuestionType
}

export enum QuestionType {
    EditableCode, // qn with editable code that can run
    MultipleChoice, // mcq
    Checkboxes // select all that applies
}

type MyProps = {
    lastQuestion: boolean,
    isLoading: boolean,
    index: number,
    question: QuestionIface,
    nextQuestion: () => void,
    prevQuestion: () => void,
    checkAnswer: () => void,
    toggleComplete: (arg0: boolean) => void,
};

class Question extends React.Component<MyProps, {}> {

    handleAnswerChange = (newValue: string) => {
        this.props.question.answer = newValue;
    };

    checkMCQAns = (i: number) => {
        const ans = this.props.question.answer as number;
        if (i === ans) {
            this.props.toggleComplete(true);
        } else {
            this.props.toggleComplete(false);
        }
    }

    renderQuestion = () => {
        switch (this.props.question.type) {
            case QuestionType.EditableCode:
                return this.renderEditableCode();
            case QuestionType.MultipleChoice:
                return this.renderMCQ();
            case QuestionType.Checkboxes:
                return (
                    // TODO implement
                    <Row className='w-100'></Row>
                );
            default:
                break;
        }
    }

    renderMCQ = () => {
        const qn = this.props.question.questionText as string[];
        let rows = [];
        for (let i = 1; i < qn.length; i++) {
            const text = qn[i]
            rows.push(
                <li onClick={() => this.checkMCQAns(i)}><span>{text}</span></li>
            );
        }
        return (
            <Row className='w-100'>
                <p className='question-instruction'><strong>{qn[0]}</strong></p>
                <ul>{rows}</ul>
            </Row>
        );
    }

    renderEditableCode = () => {
        return (
            <Row className='w-100'>
                <Col>
                    <Container fluid className='h-100'>
                        <Row className='h-50'>
                            <div style={{ lineHeight: 1 }}>
                                <h6>Instructions:</h6>
                                {this.props.question.questionTutorial.split('\n').map(function (item, key) {
                                    return (
                                        <span key={key} className='question-font'>
                                            {item}
                                            <br />
                                        </span>)
                                })}
                            </div>
                        </Row>
                        <Row className='d-flex flex-column h-50'>
                            <h6>Output:</h6>
                            <div className='output-box'>
                                <p className='feedback-text-font'>{this.props.question.feedbackText}</p>
                            </div>
                        </Row>
                    </Container>
                </Col>
                <Col>
                    <div className='d-flex align-items-center '>
                        <p className='question-instruction'><strong>{this.props.question.questionText}</strong></p>

                        <OverlayTrigger
                            key='bottom'
                            placement='bottom'
                            overlay={
                                <Tooltip id='hint'>
                                    {this.props.question.hint}
                                </Tooltip>
                            }
                        >
                            <HelpIcon />
                        </OverlayTrigger>
                    </div>
                    <AceEditor
                        wrapEnabled
                        height='40vh'
                        width='100%'
                        mode="javascript"
                        theme="monokai"
                        name="answerInput"
                        onChange={this.handleAnswerChange}
                        tabSize={4}
                        editorProps={{
                            $blockScrolling: true,
                        }}
                        value={this.props.question.answer as string}
                    />
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <Container className='d-flex align-items-center justify-content-center flex-column'>
                <Row>
                    <h3 className='question-title'>{this.props.question.questionName}: {this.props.question.questionTitle}</h3>
                </Row>
                {this.renderQuestion()}
                <Row className='d-flex w-100'>
                    <Button variant="outlined" className='button-start' size='large'
                        onClick={this.props.prevQuestion}>
                        PREVIOUS
                    </Button>
                    {/*<div className='d-flex align-items-center justify-content-center progress-bar-container'>*/}
                    {/*    <ProgressBar variant="success" now={this.props.index * 10} style={{ width: 150 }} />*/}
                    {/*    <span className='question-instruction' style={{ marginLeft: 20 }}>{this.props.index}/?? Questions</span>*/}
                    {/*</div>*/}
                    {this.props.isLoading ?
                        <CircularProgress className='loading-color ml-auto' />
                        : <Button variant="outlined" className='button-start ml-auto' size='large'
                            onClick={this.props.checkAnswer}>
                            RUN
                        </Button>}
                    <Button variant="outlined" className='button-start' size='large'
                        onClick={this.props.nextQuestion} style={{ marginLeft: 10 }}
                        disabled={!this.props.question.completed}
                    >
                        {this.props.lastQuestion ? "SUBMIT" : 'NEXT'}
                    </Button>
                </Row>
            </Container>
        );
    }
}

export default Question;

