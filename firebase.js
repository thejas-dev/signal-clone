import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// import "firebase/database";
// import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDyM6GmIBRecs9XSB7h65lX9XWFTxIzkKk",
  authDomain: "signal-clone-e79b8.firebaseapp.com",
  projectId: "signal-clone-e79b8",
  storageBucket: "signal-clone-e79b8.appspot.com",
  messagingSenderId: "704208864336",
  appId: "1:704208864336:web:017e25febc006eebeb7d55"
};
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

// let app;

// if(firebase.apps.length === 0 ){
//     const app = initializeApp(firebaseConfig);
// }else{
//     app = app()
// }

// const db = app.fireStore();
// const auth = firebase.auth();

export {db, auth};