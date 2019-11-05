import React from 'react';
import {Col, Row, Alert} from "react-bootstrap";
import {QuestionIface} from "./Question";
import {firebaseApp} from "../../util/firebase";

type MyProps = {
    question: number,
    questions: QuestionIface[],
    handleAlertClose: () => void,
};

function getRandomInt(max:number) {
    return Math.floor(Math.random() * Math.floor(max));
}

class CustomAlert extends React.Component<MyProps, {}> {

    state = {
        data: {
            correctAnswer:0,
            totalTries:0,
            wrongAnswer:0
        },
        errorAlert: ["Please try again! You can use the hints if you need more help."],
        successAlert: ["You answered the question correctly! Please move on to the next question."],
    };

    componentDidMount(): void {
        let db = firebaseApp.database().ref(`/logging/${this.props.question}`);
        db.once('value').then((snapshot) => {
            let data = snapshot.val();
            console.log(data);
            if (data !== null) {
                this.setState({data: data})
            }
        }).catch(err => {
            console.error(err);
        });
        console.log(this.props)
    };

    renderText = (pass:boolean) =>{
        if (pass){
            let successAlert = this.state.errorAlert;
            let text1 = `Congratulations, you are part of the ${Math.floor(this.state.data.correctAnswer)} people who got the question correct!`;
            successAlert.push(text1);
            let randInt = getRandomInt(successAlert.length);
            return successAlert[randInt];
        }else{
            let errorAlert = this.state.errorAlert;
            let text1 = `Don't be disheartened this is one of our more difficult questions, only ${Math.floor((this.state.data.correctAnswer/this.state.data.totalTries)*100)}% got the question correct!`
            errorAlert.push(text1);
            let randInt = getRandomInt(errorAlert.length);
            return errorAlert[randInt];
        }
    };


    render() {
        return (
            <Row className='d-flex align-items-center justify-content-center' style={{marginBottom: 10}}>
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
