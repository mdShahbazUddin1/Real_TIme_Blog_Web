import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPVm2-uk5P3aGWeP7RVGfuEFHcBssZhG8",
  authDomain: "blog-management-804c9.firebaseapp.com",
  projectId: "blog-management-804c9",
  storageBucket: "blog-management-804c9.appspot.com",
  messagingSenderId: "200999651469",
  appId: "1:200999651469:web:93a94833d504cbb5fbfac4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create a GoogleAuthProvider instance
const googleAuthProvider = new GoogleAuthProvider();

export { firebaseApp, googleAuthProvider };
