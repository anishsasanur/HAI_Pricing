// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK-2_TYyPvJghRDC2VMroj_Y8pL6w1oaA",
  authDomain: "haipricing.firebaseapp.com",
  projectId: "haipricing",
  storageBucket: "haipricing.appspot.com",
  messagingSenderId: "175026370020",
  appId: "1:175026370020:web:13e0ed995a861b8cdd83f1",
  measurementId: "G-4PR4LMZH6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);