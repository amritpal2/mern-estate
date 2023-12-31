// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-9cbf5.firebaseapp.com",
  projectId: "real-estate-9cbf5",
  storageBucket: "real-estate-9cbf5.appspot.com",
  messagingSenderId: "788435402098",
  appId: "1:788435402098:web:65403858a3c1282f90f1eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);