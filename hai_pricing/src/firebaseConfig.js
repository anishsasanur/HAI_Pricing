import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; // If you're using Cloud Firestore

const firebaseConfig = {

    apiKey: "AIzaSyAK-2_TYyPvJghRDC2VMroj_Y8pL6w1oaA",
  
    authDomain: "haipricing.firebaseapp.com",
  
    projectId: "haipricing",
  
    storageBucket: "haipricing.appspot.com",
  
    messagingSenderId: "175026370020",
  
    appId: "1:175026370020:web:13e0ed995a861b8cdd83f1",
  
    measurementId: "G-4PR4LMZH6Z"
  
};
  
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore, app};