import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

var firebaseConfig = require('./firebaseConfig.json');
export const firebaseApp = firebase.initializeApp(firebaseConfig);