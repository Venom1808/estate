// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ada26.firebaseapp.com",
  projectId: "mern-estate-ada26",
  storageBucket: "mern-estate-ada26.appspot.com",
  messagingSenderId: "826762781270",
  appId: "1:826762781270:web:b3fdccee50e593400b51f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);