import React from 'react';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import Typist from "react-typist";
import './About.css';

type MyProps = RouteComponentProps & {};

class About extends React.Component<MyProps, {}> {


    render() {
        return (
            <Container fluid style={{width: "80%"}}>
                <Row>
                    <Col xs={6}>
                        <Typist className='signup-title'>
                            About Us
                        </Typist>
                        <p style={{color: "white"}}>We are Team Richu and this is our web application to teach students
                            how to translate Python to JavaScript. This web application was made for our BT3103
                            Application Systems Development for Business Analytics Module.
                        </p>
                        <p style={{color: "white"}}>
                            We came up with this idea through surveying the student population in NUS and found a gap of
                            knowledge of not knowing JavaScript but still had a basic understanding of coding concepts.
                            Hence these 10 questions were developed using the MDN web resource to help users learn how
                            to translate python (the most commonly know language based on our survey) to JavaScript (the
                            language students wanted to learn most). Some barriers of learning included inconvenience
                            and steep learning curve. We hope that this project bridges the gap and solves this problem
                            for students.
                        </p>
                        <p style={{color: "white"}}>
                            Our main target audience will be students who are required to take a mod in JavaScript and
                            either have not learnt the language before or need some revision. Hence this web page can be
                            recommended as a preparation material for students taking those modules.</p>
                    </Col>
                    <Col xs={6}>
                        <Carousel className='h-100'>
                            <Carousel.Item className='slide-item'>
                                <h6>This web application though simple has help to revise on crucial concepts before
                                    taking a technical test for a job application! <br/><br/>-Shao Yang<br/>Year 4
                                    Business Analytics Student </h6>
                            </Carousel.Item>
                            <Carousel.Item className='slide-item'>
                                <h6>Through this web application, I learnt how to better utilise the resources that are
                                    online
                                    which I previously found hard to navigate. Now I am comfortable learning new
                                    concepts
                                    on my own!<br/><br/>-John Poh<br/>Year 2 Life Science Student</h6>

                            </Carousel.Item>
                            <Carousel.Item className='slide-item'>
                                <h6>As a business student, web development is a good skill to pick up, this course is a
                                    good intermediary for me to learn JavaScript to pick up web development skills in
                                    the future. <br/><br/>-Clarence<br/>Year 2 Business Student</h6>

                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default withRouter(About);
