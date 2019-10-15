import React from 'react';
import './Question.css';

type MyProps = {
    question: { questionName: string, questionText: string, completed: boolean },
};

class Question extends React.Component<MyProps, {}> {

    render() {

        return (
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <h3 className='question-title'>{this.props.question.questionName}</h3>

            </div>
        );
    }
}

export default Question;

