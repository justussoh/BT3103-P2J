import React from 'react';
import { firebaseApp } from "../../util/firebase";
import * as firebase from 'firebase';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from '@mdi/react';
import { mdiFacebookBox, mdiGoogle } from '@mdi/js';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

import './Resume.css'

type MyProps = RouteComponentProps & {
    userID: string,
    onUserIDChange: (name: string) => void,
    handleSaveState: () => void,
    handleLoadState: () => void,
};

class Resume extends React.Component<MyProps, {}> {

    handleFacebook = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const provider = new firebase.auth.FacebookAuthProvider();
        firebaseApp.auth().signInWithPopup(provider).then((result) => {
            //console.log('Facebook login success');
            if (result !== null && result.user !== null && result.user.uid !== null) {
                const userID = result.user.uid;
                this.props.onUserIDChange(userID);
                this.props.handleLoadState();
                this.props.history.push('/');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    handleGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebaseApp.auth().signInWithPopup(provider).then((result) => {
            //console.log('Google login success');
            if (result !== null && result.user !== null && result.user.uid !== null) {
                const userID = result.user.uid;
                this.props.onUserIDChange(userID);
                this.props.handleLoadState();
                this.props.history.push('/');

            }
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return (
            <div style={{ width: 425 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                        <span style={{ color: 'white', textAlign: "center", fontWeight: 'bold' }}>
                            Type in your past user ID to continue or login to save your progress
                        </span>
                    </Grid>
                    <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                        <div className='w-100'>
                            <label className="field a-field a-field_a3">
                                <input className="field__input a-field__input" value={this.props.userID}
                                    onChange={(e) => { this.props.onUserIDChange(e.target.value) }}
                                />
                                <span className="a-field__label-wrap">
                                    <span className="a-field__label">Enter User ID</span>
                                </span>
                            </label>
                            <div className='d-flex'>
                                <Button variant="outlined" className='button-start' size='large'
                                    onClick={this.props.handleSaveState}>
                                    SAVE
                                </Button>
                                <Button variant="outlined" className='button-start ml-auto' size='large'
                                    onClick={this.props.handleLoadState}>
                                    LOAD
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} className='d-flex align-items-center justify-content-center'>
                        <Button variant="outlined" onClick={this.handleFacebook} className='resume-auth' fullWidth>
                            <span><Icon path={mdiFacebookBox} size={1} style={{ fill: 'white' }} /> Facebook</span>
                        </Button>
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

export default withRouter(Resume);

