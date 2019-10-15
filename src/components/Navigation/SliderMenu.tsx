import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import {push as Menu, State} from "react-burger-menu";
import './SliderMenu.css';
import Button from "@material-ui/core/Button";


type MyProps = {
    open: boolean,
    question: number,
    questions: {
        questionName: string,
        questionTitle: string,
        questionTutorial: string,
        questionText: string,
        answer:string,
        answerPlaceholder:string,
        completed: boolean
    }[],
    handleMenu: (arg0: boolean) => void,
    handleClickQuestion: (arg0: number) => void,
    handleMenuStateChange: (arg0: State) => void,
    handleStart: () => void,
};

class SliderMenu extends React.Component<MyProps, {}> {

    render() {

        const listQuestions = this.props.questions.map((question, index) => {
            if (index === 0 || index === 11) {
                return ''
            } else {
                return (
                    <Grid item xs={12} onClick={() => this.props.handleClickQuestion(index)} key={index}>
                        {question.questionName}
                    </Grid>);
            }
        });

        return (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"root"}
                  customBurgerIcon={false} isOpen={this.props.open}
                  onStateChange={(state) => this.props.handleMenuStateChange(state)}
                  customCrossIcon={false} className='menu-width'
            >
                <Grid container spacing={3}
                >
                    <Grid item xs={12} className='d-flex align-items-center'>
                        <IconButton className='closeButtonMenu ml-auto' onClick={() => this.props.handleMenu(false)}>
                            <CloseIcon className='closeIconMenu'/>
                        </IconButton>
                    </Grid>
                    {this.props.question === 0 ?
                        <Grid item xs={12}>
                            <Button variant="outlined" className='button-start' size='large'
                                    onClick={this.props.handleStart}>
                                START
                            </Button>
                        </Grid>
                        :
                        <div>
                            {listQuestions}
                        </div>
                    }
                </Grid>
            </Menu>
        )

    }
}

export default SliderMenu;
