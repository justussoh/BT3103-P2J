import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { push as Menu, State } from "react-burger-menu";
import './SliderMenu.css';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import CircleIcon from '@material-ui/icons/Lens';
import CircleOutlineIcon from '@material-ui/icons/LensOutlined';
import { QuestionType } from "../Form/Question";

type MyProps = {
    open: boolean,
    question: number,
    questions: QuestionType[],
    handleMenu: (arg0: boolean) => void,
    handleClickQuestion: (arg0: number) => void,
    handleMenuStateChange: (arg0: State) => void,
    handleStart: () => void,
    toggleAdmin: () => void,
};

class SliderMenu extends React.Component<MyProps, {}> {

    render() {

        const listQuestions = this.props.questions.map((question, index) => {
            if (index === 0 || index === 11) {
                return ''
            } else {
                return (
                    <Grid item xs={12} onClick={() => {
                        if (question.completed) {
                            this.props.handleClickQuestion(index)
                        }
                    }} key={index} className={`d-flex align-items-center ${question.completed ? "hover-pointer" : "hover-cancel"}`}
                    >
                        {question.completed ? <CircleIcon style={{ color: 'green' }} /> : <CircleOutlineIcon style={{ color: 'red' }} />}
                        <span style={{ marginLeft: 10 }}>
                            {question.questionName}
                        </span>
                    </Grid>);
            }
        });

        return (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"root"}
                isOpen={this.props.open}
                onStateChange={(state) => this.props.handleMenuStateChange(state)}
                className='menu-width'
            >
                <Grid container spacing={3}
                >
                    <Grid item xs={12} className='d-flex align-items-center'>
                        <IconButton className='closeButtonMenu ml-auto' onClick={() => this.props.handleMenu(false)}>
                            <CloseIcon className='closeIconMenu' />
                        </IconButton>
                    </Grid>
                    {this.props.question === 0 || this.props.question === (this.props.questions.length) ?
                        <Grid container spacing={3}>
                            <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                                <Button variant="outlined" className='button-start' size='large'
                                    onClick={this.props.handleStart}>
                                    START
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant='middle' style={{ backgroundColor: '#fff' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <span style={{ color: 'white' }}>
                                    From Python to JS is a quick and easy online module will teach you JavaScript, the popular programming language used for the Web.
                                </span>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            {listQuestions}
                            <Button variant="outlined" className='button-start'
                                onClick={this.props.toggleAdmin}>
                                Admin mode</Button>
                        </Grid>
                    }
                </Grid>
            </Menu>
        )

    }
}

export default SliderMenu;
