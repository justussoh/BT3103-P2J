import React from 'react';
import {QuestionIface} from "../Form/Question";
import AceEditor from "react-ace";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Paper from "@material-ui/core/Paper";
import {Row, Col, Container} from "react-bootstrap";

type MyProps = {
    questions: QuestionIface[],
    question: number,
};

class PastAnswers extends React.Component<MyProps, {}> {

    state = {
        showAnswer: 0,
    };

    handlePastAnswerSelect = (e: any) => {
        this.setState({showAnswer: e.target.value})
    };

    render() {
        const questions = this.props.questions;
        const currQ = this.props.question;

        if (!questions[currQ].pastAnswers || questions[currQ].pastAnswers.length === 0) {
            return (
                <div style={{minHeight:'60vh'}} className='d-flex align-items-center'>
                    <h6>You have not submitted any answer yet.</h6>
                </div>
            )
        }

        return (
            <Container fluid>
                <Row>
                    <Col lg="auto" md="auto">
                        <Paper>
                            <FormControl>
                                <Select value={this.state.showAnswer} onChange={this.handlePastAnswerSelect}>
                                    {questions[currQ].pastAnswers.map((ans, index) => {
                                        return (
                                            <MenuItem value={index}>{index + 1}. Attempt {index + 1}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AceEditor
                            wrapEnabled
                            height='50vh'
                            width='100%'
                            mode="javascript"
                            theme="monokai"
                            name="info-section"
                            tabSize={0}
                            editorProps={{
                                $blockScrolling: true,
                            }}
                            value={questions[currQ].pastAnswers[this.state.showAnswer].pastAnswer as string}
                            style={{maxWidth: 570}}
                        />
                    </Col>
                    <Col lg={6} md={6}>
                        <Paper>
                            <div
                                dangerouslySetInnerHTML={{__html: questions[currQ].pastAnswers[this.state.showAnswer].errorMessage}}/>
                        </Paper>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PastAnswers;

