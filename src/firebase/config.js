// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMICtGNNREZijhsUlBVx2QBhSg82Mxc0Q",
  authDomain: "zani-baby-shop.firebaseapp.com",
  projectId: "zani-baby-shop",
  storageBucket: "zani-baby-shop.firebasestorage.app",
  messagingSenderId: "736412898141",
  appId: "1:736412898141:web:02a0b9fd12f711c72e0eb4",
  measurementId: "G-NR1RTLX32G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);