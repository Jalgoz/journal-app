// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDG0YMOm_YzC8BgFFxbRmtHCYzIcyXFkc",
  authDomain: "react-cursos-aa783.firebaseapp.com",
  projectId: "react-cursos-aa783",
  storageBucket: "react-cursos-aa783.appspot.com",
  messagingSenderId: "135690032455",
  appId: "1:135690032455:web:e0be7170707f2ac3736862"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);