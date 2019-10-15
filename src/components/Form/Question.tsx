import React from 'react';
import './Question.css';
import AceEditor from "react-ace";
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

type MyProps = {
    question: {
        questionName: string,
        questionTitle: string,
        questionTutorial: string,
        questionText: string,
        answer:string,
        answerPlaceholder:string,
        completed: boolean
    },
    nextQuestion: () => void,
    prevQuestion: () => void,
};

class Question extends React.Component<MyProps, {}> {

    handleAnswerChange = (newValue:string) => {
        this.props.question.answer = newValue;
    };

    render() {

        return (
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <h3 className='question-title'>{this.props.question.questionName}: {this.props.question.questionTitle}</h3>
                <p>{this.props.question.questionTutorial}</p>
                <p><strong>{this.props.question.questionText}</strong></p>
                <AceEditor
                    wrapEnabled
                    height='50vh'
                    width='70vw'
                    mode="javascript"
                    theme="monokai"
                    name="answerInput"
                    onChange={this.handleAnswerChange}
                    tabSize={4}
                    editorProps={{
                        $blockScrolling: true,
                    }}
                    value={this.props.question.answerPlaceholder}
                />
                <div className='d-flex w-100'>
                    <Button variant="outlined" className='button-start' size='large'
                            onClick={this.props.prevQuestion} >
                        PREVIOUS
                    </Button>
                    <Button variant="outlined" className='button-start ml-auto' size='large'
                            onClick={this.props.nextQuestion}>
                        RUN
                    </Button>
                    <Button variant="outlined" className='button-start' size='large'
                            onClick={this.props.nextQuestion} style={{marginLeft:10}}>
                        NEXT
                    </Button>
                </div>
            </div>
        );
    }
}

export default Question;

