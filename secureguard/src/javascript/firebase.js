// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpcNR_InO7qBFoYHAH143TYiSxlDYFIuU",
  authDomain: "guard-c45b0.firebaseapp.com",
  projectId: "guard-c45b0",
  storageBucket: "guard-c45b0.firebasestorage.app",
  messagingSenderId: "378520147505",
  appId: "1:378520147505:web:dbc2d981e82be2f650a710"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Firebase Services 🔹
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };