import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { push as Menu, State } from "react-burger-menu";
import './SliderMenu.css';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import { QuestionIface } from "../Form/Question";

type MyProps = {
    open: boolean,
    question: number,
    questions: QuestionIface[],
    handleMenu: (arg0: boolean) => void,
    handleClickQuestion: (arg0: number) => void,
    handleMenuStateChange: (arg0: State) => void,
    handleSaveState: (arg0: string) => void,
    handleLoadState: (arg0: string) => void,
    handleStart: () => void,
    toggleAdmin: () => void,
};

class SliderMenu extends React.Component<MyProps, {}> {

    state = {
        userId: ''
    };

    handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ userId: e.target.value });
    };

    handleSaveStateCheck = () => {
        if (this.state.userId !== '') {
            this.props.handleSaveState(this.state.userId)
        }
    };

    handleResume = () => {
        // history.push('/load');
        this.props.handleMenu(false);
    };

    render() {

        return (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"root"}
                isOpen={this.props.open}
                onStateChange={(state) => this.props.handleMenuStateChange(state)}
                className='menu-width'
            >
                {this.props.question === 0 || this.props.question === (this.props.questions.length) ?
                    <Grid container spacing={3}>
                        <Grid item xs={12} className='d-flex align-items-center'>
                            <IconButton className='closeButtonMenu ml-auto'
                                onClick={() => this.props.handleMenu(false)}>
                                <CloseIcon className='closeIconMenu' />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                            <Button variant="outlined" className='button-start' size='large'
                                onClick={this.props.handleStart}>
                                START
                            </Button>
                        </Grid>
                        <Grid item xs={12} className='d-flex align-items-center justify-content-center'>

                            <Button variant="outlined" className='button-start'
                                onClick={this.handleResume}>
                                RESUME
                                </Button>

                        </Grid>
                        <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                            <Button variant="outlined" className='button-start'
                                onClick={this.props.toggleAdmin}>
                                ADMIN MODE</Button>
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
                    <Grid container spacing={2} className='h-100'>
                        <Grid item xs={12} className='d-flex align-items-center'>
                            <IconButton className='closeButtonMenu ml-auto'
                                onClick={() => this.props.handleMenu(false)}>
                                <CloseIcon className='closeIconMenu' />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <span style={{ color: 'white' }}>
                                Are you feeling lost? Need some help? Here are some resources to help you learn.
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <span style={{ color: 'white' }}>
                                <a href='https://www.w3schools.com/js/' target='_blank' rel="noopener noreferrer">01. W3 Schools</a>
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <span style={{ color: 'white' }}>
                                <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' target='_blank' rel="noopener noreferrer">02. MDN Web Documents</a>
                            </span>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' style={{ backgroundColor: '#fff' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <span style={{ color: 'white' }}>
                                Want to continue some other time? Simply key in a unique key and save!
                            </span>
                        </Grid>

                        <Grid item xs={12} className='userId-container'>
                            <label className="field a-field a-field_a3">
                                <input className="field__input a-field__input" placeholder="e.g. sy95"
                                    onChange={this.handleUserIdChange}
                                />
                                <span className="a-field__label-wrap">
                                    <span className="a-field__label">Enter User ID</span>
                                </span>
                            </label>
                            <div className='d-flex'>
                                <Button variant="outlined" className='button-start' size='large'
                                    onClick={this.handleSaveStateCheck}>
                                    SAVE
                                </Button>
                                <Button variant="outlined" className='button-start ml-auto' size='large'
                                    onClick={() => this.props.handleLoadState(this.state.userId)}>
                                    LOAD
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                }
            </Menu>
        )

    }
}

export default SliderMenu;
