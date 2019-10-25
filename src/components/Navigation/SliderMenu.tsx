import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import {push as Menu, State} from "react-burger-menu";
import './SliderMenu.css';
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import {QuestionIface} from "../Form/Question";
import TextField from "@material-ui/core/TextField";

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

    state={
        userId:''
    };

    handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({userId: e.target.value});
    };

    handleSaveStateCheck = ()=>{
        if(this.state.userId !== '' ){
            this.props.handleSaveState(this.state.userId)
        }
    };



    render() {

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
                            <CloseIcon className='closeIconMenu'/>
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
                            <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                                <Button variant="outlined" className='button-start'
                                        onClick={this.props.toggleAdmin}>
                                    RESUME
                                </Button>
                            </Grid>
                            <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                                <Button variant="outlined" className='button-start'
                                        onClick={this.props.toggleAdmin}>
                                    ADMIN MODE</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant='middle' style={{backgroundColor: '#fff'}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <span style={{color: 'white'}}>
                                    From Python to JS is a quick and easy online module will teach you JavaScript, the popular programming language used for the Web.
                                </span>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-dense"
                                    label="Enter User ID"
                                    className=''
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleUserIdChange}
                                />
                                <div className='d-flex'>
                                    <Button variant="outlined" className='button-start' size='large'
                                            onClick={this.handleSaveStateCheck}>
                                        SAVE
                                    </Button>
                                    <Button variant="outlined" className='button-start ml-auto' size='large'
                                            onClick={()=>this.props.handleLoadState(this.state.userId)}>
                                        LOAD
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Menu>
        )

    }
}

export default SliderMenu;
