import React, { Component } from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import { Container, Col, Row } from 'react-bootstrap';
import NavBar from "./components/Navigation/NavBar";
import SliderMenu from "./components/Navigation/SliderMenu";
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';


import './App.css';

const questions = require('./questions.json')

class App extends Component {

    state = {
        openMenu: false,
        question: 0,
    };

    handleOpenMenu = () => {
        this.setState({ openMenu: true });
    };

    handleCloseMenu = () => {
        this.setState({ openMenu: false });
    };

    handleClickQuestion = (i) => {
        this.setState({
            openMenu: false,
            question: i
        });
    };

    handleMenuStateChange = (state) => {
        this.setState({ openMenu: state.isOpen })
    };

    onChange = (newValue) => {
        console.log('change', newValue);
    };

    renderContent = () => {

        return (
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <Typist className='title-font'>
                    Learn how to script in JavaScript from Python!
                </Typist>
                <div className='d-flex align-items-center justify-content-center flex-column' style={{ marginTop: '25px' }}>
                    <AceEditor
                        readOnly={false}
                        wrapEnabled
                        height='50vh'
                        width='70vw'
                        mode="javascript"
                        theme="monokai"
                        onChange={this.onChange}
                        name="info-section"
                        tabSize={0}
                        editorProps={{
                            $blockScrolling: true,
                        }}
                        value={questions[this.state.question]}
                    />
                </div>
                <Button variant="outlined" className='button-start ml-auto' size='large'>
                    START
                </Button>
            </div>
        );
    };

    render() {
        return (
            <div className="App">
                <SliderMenu open={this.state.openMenu} handleCloseMenu={this.handleCloseMenu}
                    handleMenuStateChange={this.handleMenuStateChange}
                    handleClickQuestion={this.handleClickQuestion} />
                <Container fluid className='container-main d-flex align-items-center justify-content-center'
                    id='page-wrap'>
                    <NavBar handleOpenMenu={this.handleOpenMenu} />
                    <Row className='d-flex align-items-center justify-content-center' style={{ width: '80vw' }}>
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
