import React, {Component} from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import {Container, Col, Row} from 'react-bootstrap';
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
                feedbackText:"",
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
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 2",
                questionTitle: "Declarations",
                questionTutorial: "In JavaScipt, there are three kinds of variable declarations in JS.\n" +
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
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 3",
                questionTitle: "Basic Functions",
                questionTutorial: "In JavaScipt, we first have to declare functions as functions.\n Also, replace the : with curly braces {}",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "def square(num):\n      return num * num",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 4",
                questionTitle: "Default Parameters",
                questionTutorial: "In JavaScipt, default parameters allow us to initialize functions with default values.\n",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "def multiply(a, b=5):\n" +
                    "    b = b if type(b)==int else 1\n" +
                    "    return a * b",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 5",
                questionTitle: "Rest Parameters",
                questionTutorial: "The rest parameter syntax allows us to represent an indefinite number of arguments as an array.\n",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "def multiply(multiplier, *args):\n" +
                    "    return map(lambda x: multiplier * x, args) \n" +
                    "\n" +
                    "var arr = multiply(2, 1, 2, 3);\n" +
                    "console.log(arr); // [2, 4, 6]",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 6",
                questionTitle: "Control Flow",
                questionTutorial: "Using if-else, define a function odd(x) that returns True when its integer argument is an odd number and False otherwise\n" +
                    "\n" +
                    "function odd(x){\n" +
                    "    return x%2 === 1\n" +
                    "}\n" +
                    "Using switch, write a function getPrice that takes in the name of a fruit and logs the price of the fruit. Oranges are $1, apples are $2, and bananas are $3. If the fruit is none of the 3, log an apology. Sample execution below:",
                questionText: "Please write a switch statement",
                answer: "",
                answerPlaceholder: "getPrice('oranges') // logs \"$1\"\n" +
                    "getPrice('pears') // logs \"Sorry, we are out of pears.\"\n" +
                    "function getPrice(fruits) {\n" +
                    "}",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 7",
                questionTitle: "Error Handling",
                questionTutorial: "",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "try:\n" +
                    "    monthName = getMonthName(month) # function could throw exception\n" +
                    "except Exception as e:\n" +
                    "    monthName = 'unknown'\n" +
                    "    logMyErrors(e)",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 8",
                questionTitle: "Loops and Iterations",
                questionTutorial: "The for statement creates a loop that is executed as long as a condition is true.",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "for step in range(5):\n" +
                    "    print(\"i am at step: \" + step)",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 9",
                questionTitle: "Working with Objects",
                questionTutorial: "Objects are similar to Python dictionaries, they hold a key:value pairing. An example of initialising a object is as shown below:\n" +
                    "var myCar = new Object();\n" +
                    "myCar.make = 'Ford';\n" +
                    "myCar.model = 'Mustang';\n" +
                    "myCar.year = 1969;",
                questionText: "Using a for..in loop, print all the available properties of",
                answer: "",
                answerPlaceholder: "for k in myCar.keys():\n" +
                    "   print (k, myCar[k]) ",
                feedbackText:"",
                completed: false,
            },
            {
                questionName: "Task 10",
                questionTitle: "Promises",
                questionTutorial: "Testing",
                questionText: "Please convert the following to JavaScript syntax!",
                answer: "",
                answerPlaceholder: "Haven complete",
                feedbackText:"",
                completed: false,
            },
        ],
        feedbackRating:0,
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

    handleCheckAnswer = async () => {
        //Add in fetch nonsense
        let gatewayURL = "https://cl8r4dbpqe.execute-api.us-east-1.amazonaws.com/Prod/";
        let questionURL = gatewayURL + `?question=${this.state.question}`;
        let answer = {
            "userToken": "ABCDE",
            "shown": {
                "0": ""
            },
            "editable": {
                "0": this.state.questions[this.state.question].answer
            },
            "hidden": {
                "0": ""
            }
        };
        try{
            const res = await axios.post(questionURL, {...answer}, {
                headers: {
                    Accept: 'application/json',
                }
            });
            const responseBody = JSON.parse(res.data);
            let questions = this.state.questions;
            questions[this.state.question].completed = responseBody.isComplete;
            questions[this.state.question].feedbackText = responseBody.feedbackText;
            // questions[this.state.question].completed = true;
            this.setState({questions: questions})
        }
        catch (err) {
            console.log(err);
        }

    };


    doCrazyShit = () => {
        const gatewayURL = "https://cl8r4dbpqe.execute-api.us-east-1.amazonaws.com/Prod/";
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
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <Typist className='title-font'>
                            Congratulations on finishing the course
                        </Typist>
                        <p style={{marginBottom:0}}>Please leave us a rating below</p>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                            <Rating
                                name="simple-controlled"
                                value={this.state.feedbackRating}
                                onChange={(event, newValue) => {
                                    this.setState({feedbackRating:newValue})
                                }}
                                size="large"
                                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color:"white"}}/>}
                            />
                        </Box>
                        <p>And also help us to complete a feedback form here.</p>
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
