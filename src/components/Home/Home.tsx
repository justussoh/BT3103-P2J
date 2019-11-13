import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import Typist from "react-typist";
import 'react-typist/dist/Typist.css';
import Button from "@material-ui/core/Button";
import AceEditor from "react-ace";
import {QuestionIface} from "../Form/Question";

type MyProps = RouteComponentProps & {
    loggedIn: boolean,
    questions: QuestionIface[],
    handleStart: () => void,
};

class Home extends React.Component<MyProps, {}> {

    handleResume = () => {
        this.props.history.push('/load');

    };

    render() {
        const questions = this.props.questions;
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
                        value={questions[0].questionText as string}
                    />
                </div>
                <div className='d-flex align-items-center' style={{width:'100%'}}>
                    <Button variant="outlined" className='button-start' size='large'
                            onClick={this.handleResume}>
                        RESUME
                    </Button>
                    <Button variant="outlined" className='button-start ml-auto' size='large'
                            onClick={this.props.handleStart}>
                        START
                    </Button>
                </div>
            </div>
        );
    }


}

export default withRouter(Home);
