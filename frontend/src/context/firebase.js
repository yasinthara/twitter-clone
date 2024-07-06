import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBGl355skYmdFJ-Y27DNmYVKZwNQBzEq-c",
    authDomain: "twitter-17159.firebaseapp.com",
    projectId: "twitter-17159",
    storageBucket: "twitter-17159.appspot.com",
    messagingSenderId: "153411174283",
    appId: "1:153411174283:web:39b7d2b315f90f0e0b398e",
    measurementId: "G-NKEPJMTTG9"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;



export { signInWithPhoneNumber, PhoneAuthProvider };