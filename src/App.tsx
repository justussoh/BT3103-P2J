import React, {Component} from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import {Container, Col, Row} from 'react-bootstrap';
import NavBar from "./components/Navigation/NavBar";
import Question from "./components/Form/Question";
import SliderMenu from "./components/Navigation/SliderMenu";
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';


import './App.css';


// const questions = require('./questions.json');

class App extends Component {

    state = {
        openMenu: false,
        question: 0,
        returnedData: null,
        questions: [
            {
                questionName: "",
                questionTitle: "",
                questionTutorial: "",
                questionText: "/*\n Welcome to From Python to JS. \n\n This quick and easy online module will teach you JavaScript, the popular programming language used for the Web. \n\n JavaScript is a scripting or programming language that allows you to implement complex things on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, along with HTML and CSS .\n*/",
                answer: "",
                answerPlaceholder: "",
                completed: false,
            },
            {
                questionName: "Task 1",
                questionTitle: "Comments",
                questionTutorial: "In JavaScipt, commenting can be done by using: \n // For single line code \n /* For multiline code */",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "# a one line comment\n" +
                    "\n" +
                    "'''\n" +
                    "this is a longer,\n" +
                    "multi-line comment\n" +
                    "'''",
                completed: false,
            },
            {
                questionName: "Task 2",
                questionTitle: "Declarations",
                questionTutorial: "In JavaScipt, There are three kinds of variable declarations in JS.\n" +
                    "var: Declares a variable, optionally initializing it to a value\n" +
                    "let: Declares a block-scoped, local variable, optionally initializing it to a value\n" +
                    "const: Declares a block-scoped, read-only named constant.\n",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "x = 42\n" +
                    "y = 13\n" +
                    "x = \"forty-two\"\n" +
                    "z = \"The answer is\" + 42\n" +
                    "coffees = ['French Roast', 'Colombian', 'Kona']",
                completed: false,
            },


        ],
    };

    handleMenu = (isOpen: boolean) => {
        this.setState({openMenu: isOpen})
    };


    handleClickQuestion = (i: number) => {
        this.setState({
            openMenu: false,
            question: i
        });
    };

    handleMenuStateChange = (state: any) => {
        this.setState({openMenu: state.isOpen})
    };

    handleStart = () => {
        this.setState({question: 1, openMenu: false,})
    };

    handleNextQuestion = () => {
        this.setState({question: this.state.question + 1})
    };

    handlePrevQuestion = () => {
        this.setState({question: this.state.question - 1})
    };

    handleFinishCourse = () => {
        this.setState({question: this.state.questions.length - 1})
    };

    handleCheckAnswer = () => {
        //Addin fetch nonsense
        let questions = this.state.questions;
        questions[this.state.question].completed = true;
        this.setState({questions: questions})
    };


    doCrazyShit = () => {
        const gatewayURL = "https://cl8r4dbpqe.execute-api.us-east-1.amazonaws.com/Prod/"
        fetch(gatewayURL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                userToken: "abcde",
                shown: {
                    0: ""
                },
                editable: {
                    0: ""
                },
                hidden: {
                    0: ""
                }
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data);
            this.setState({returnedData: data});
        })
    };

    renderContent = () => {
        switch (this.state.question) {
            case 0:
                return (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        {/*{JSON.stringify(this.state.returnedData)}*/}
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
                    <div>
                        <h3>Congratulations on finishing the course</h3>
                        <p>Please leave us a rating below</p>

                    </div>
                );
            default:
                return (
                    <Question question={this.state.questions[this.state.question]}
                              nextQuestion={this.handleNextQuestion}
                              prevQuestion={this.handlePrevQuestion}
                              checkAnswer={this.handleCheckAnswer}
                              lastQuestion={this.state.question === this.state.questions.length - 1}/>
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
                <Container fluid className='container-main d-flex align-items-center justify-content-center'
                           id='page-wrap'>
                    <NavBar handleMenu={this.handleMenu}/>
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
