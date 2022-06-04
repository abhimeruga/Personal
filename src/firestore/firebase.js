// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI2HRLllH48aOyRTUcf_Khnzotc0djYoo",
  authDomain: "personal-e8e0a.firebaseapp.com",
  databaseURL: "https://personal-e8e0a-default-rtdb.firebaseio.com",
  projectId: "personal-e8e0a",
  storageBucket: "personal-e8e0a.appspot.com",
  messagingSenderId: "472518789578",
  appId: "1:472518789578:web:67b35dd60815665c9ca733",
  measurementId: "G-19LXWQFEKN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { database };
