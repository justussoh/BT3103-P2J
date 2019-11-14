import React from 'react';
import { Col, Row, Alert } from "react-bootstrap";
import { QuestionIface } from "./Question";
import { firebaseApp } from "../../util/firebase";

type MyProps = {
    question: number,
    alertData: {
        correctAnswer: number,
        totalTries: number,
        wrongAnswer: number
    }[],
    questions: QuestionIface[],
    handleAlertClose: () => void,
};

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

class CustomAlert extends React.Component<MyProps, {}> {

    state = {
        errorAlert: ["Please try again! You can use the hints if you need more help."],
        successAlert: ["You answered the question correctly! Please move on to the next question."],
    };

    renderText = (pass: boolean) => {
        if (pass) {
            let successAlert = this.state.successAlert;
            successAlert.push(`Congratulations, you are part of the ${Math.floor(this.props.alertData[this.props.question].correctAnswer)} people who got the question correct!`);
            return successAlert[getRandomInt(successAlert.length)];
        } else {
            let errorAlert = this.state.errorAlert;
            const percentage = Math.floor((this.props.alertData[this.props.question].correctAnswer / this.props.alertData[this.props.question].totalTries) * 100);
            errorAlert.push(`Don't be disheartened this is one of our more difficult questions, only ${percentage}% got the question correct!`);
            return errorAlert[getRandomInt(errorAlert.length)];
        }
    };

    render() {
        return (
            <Row className='d-flex align-items-center justify-content-center' style={{ marginBottom: 10 }}>
                <Col xs={10}>
                    <Alert
                        variant={this.props.questions[this.props.question].completed ? "success" : "danger"}
                        onClose={this.props.handleAlertClose}
                        dismissible>
                        {this.renderText(this.props.questions[this.props.question].completed)}
                    </Alert>
                </Col>
            </Row>
        )
    }
}

export default CustomAlert;
