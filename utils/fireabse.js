// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginlms-1f8ed.firebaseapp.com",
  projectId: "loginlms-1f8ed",
  storageBucket: "loginlms-1f8ed.firebasestorage.app",
  messagingSenderId: "924635794057",
  appId: "1:924635794057:web:61f18cba756b2fbf9f5458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider} 