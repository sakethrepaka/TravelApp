// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOIHmBJCrJfRF1K2L3ecgLapvc_iU0vNc",
  authDomain: "planyourtrip-cc79c.firebaseapp.com",
  projectId: "planyourtrip-cc79c",
  storageBucket: "planyourtrip-cc79c.appspot.com",
  messagingSenderId: "794459768779",
  appId: "1:794459768779:web:1348d812d9d0e0dbf7984e",
  measurementId: "G-Q42KLBG39H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

// const analytics = getAnalytics(app);