// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCr0j3xyCyZLPWHbB4uK_-HZiMnPORgxM",
  authDomain: "fir-221a3.firebaseapp.com",
  projectId: "fir-221a3",
  storageBucket: "fir-221a3.appspot.com",
  messagingSenderId: "937083414202",
  appId: "1:937083414202:web:6d8f7b2a1360a30764c483",
  measurementId: "G-JHRNHJ25TL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
