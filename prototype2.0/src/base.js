import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import "firebase/storage"

const app = firebase.initializeApp({
    apiKey: "AIzaSyC3GKR7jetB0fvfUg3nIi8-qonxnAy2e_g",
    authDomain: "web3-prototype-react.firebaseapp.com",
    databaseURL: "https://web3-prototype-react.firebaseio.com",
    projectId: "web3-prototype-react",
    storageBucket: "web3-prototype-react.appspot.com",
    messagingSenderId: "163765485117",
    appId: "1:163765485117:web:217f59a4887f679c5df454"
});

export default app;