// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "nwitter-783ad.firebaseapp.com",
  projectId: "nwitter-783ad",
  storageBucket: "nwitter-783ad.appspot.com",
  messagingSenderId: "778314860625",
  appId: "1:778314860625:web:28d7917f98599734cdd070"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();