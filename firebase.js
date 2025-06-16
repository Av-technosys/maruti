// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcrKft86R3cyn5tNeSQ4tAfT_L4gggUUs",
  authDomain: "av-maruti.firebaseapp.com",
  projectId: "av-maruti",
  storageBucket: "av-maruti.firebasestorage.app",
  messagingSenderId: "1082527502092",
  appId: "1:1082527502092:web:acd26291f5d12c83880329",
  measurementId: "G-29PMLFKZDW",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const auth = getAuth(app);

auth.useDeviceLanguage();
export { auth };
