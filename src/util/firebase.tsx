import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCyqp3-1_RgOzY693ucdrQMbK2WIcIUUZk",
    authDomain: "pythontojavascript.firebaseapp.com",
    databaseURL: "https://pythontojavascript.firebaseio.com",
    projectId: "pythontojavascript",
    storageBucket: "pythontojavascript.appspot.com",
    messagingSenderId: "69240043646",
    appId: "1:69240043646:web:1d62b420eda2e45c88802f",
    measurementId: "G-9PH2BQQCT4"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);