import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {Container} from "react-bootstrap";
import Typist from "react-typist";
import 'react-typist/dist/Typist.css';
import {firebaseApp} from "../../util/firebase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@mdi/react";
import {mdiGoogle} from "@mdi/js";
import Divider from "@material-ui/core/Divider";
import * as firebase from "firebase";

type MyProps = RouteComponentProps & {
    handleSaveState: () => void,
    handleStart: () => void,
    onUserIDChange: (userID: string) => void,
    userID: string,
};

class Signup extends React.Component<MyProps, {}> {

    state = {
        uidArray: [],
    };

    componentDidMount(): void {
        let db = firebaseApp.database().ref(`/userdata`);
        db.once('value').then((snapshot) => {
            const data = snapshot.val();
            let uidArray = Object.keys(data);
            this.setState({uidArray: uidArray})
        }).catch(err => {
            console.error(err);
        });
    }

    onSignup = (e:any) =>{
        e.preventDefault();
        this.props.handleSaveState();
        window.setTimeout(()=>{
            this.props.handleStart();
        },1000)
    };

    handleGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseApp.auth().signInWithPopup(provider).then((result) => {
            //console.log('Google login success');
            if (result !== null && result.user !== null && result.user.uid !== null) {
                const userID = result.user.uid;
                this.props.onUserIDChange(userID);
                this.props.handleSaveState();
                window.setTimeout(()=>{
                    this.props.handleStart();
                },1000)
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <div style={{width: 425}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                        <Typist className='signup-title'>
                            Hi, nice to meet you! Please enter your name. This will be used to save your progress later
                            on!
                        </Typist>
                    </Grid>
                    <Grid item xs={12} className='d-flex align-items-center justify-content-center'>

                        <div className='w-100'>
                            <form onSubmit={this.onSignup}>
                                <label className="field a-field a-field_a3">
                                    <input className="field__input a-field__input" value={this.props.userID} required
                                           onChange={(e) => {
                                               this.props.onUserIDChange(e.target.value)
                                           }}
                                    />
                                    <span className="a-field__label-wrap">
                                    <span className="a-field__label">Enter User ID</span>
                                </span>
                                </label>
                                <div className='d-flex'>
                                    <Button variant="outlined" className='button-start ml-auto' size='large'
                                            type='submit'>
                                        CONTINUE
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant='middle' style={{backgroundColor: '#fff'}}/>
                    </Grid>
                    <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                        <Button variant="outlined" onClick={this.handleGoogle} className='resume-auth' fullWidth>
                            <span><Icon path={mdiGoogle} size={1} style={{ fill: 'white' }} /> Google</span>
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }


}

export default withRouter(Signup);
