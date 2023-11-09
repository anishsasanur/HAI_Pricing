
import {app, firestore} from './firebaseConfig';
import { collection, doc, setDoc, getDocs, addDoc, arrayUnion } from "firebase/firestore";
import { currentTime } from './timeTracker';

export const createUser = async (sessionID, fullName) => {
    const data = {
        fullName: fullName,
        hints: [],
        p1prices: [],
        p2prices: [],
        p1signals: [],
        p2signals: [],
        loginTime: currentTime
    };
    
    const userDocRef = doc(collection(firestore, 'Users'), sessionID);

    try {
        await setDoc(userDocRef, data);
        console.log("Document written with ID: ", sessionID);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export const pushPrices = async (sessionID, p1, p2) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        p1Prices: arrayUnion(p1),
        p2Prices: arrayUnion(p2),
    }, { merge: true });
}

export const pushSignals = async (sessionID, s1, s2) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        p1Signals: arrayUnion(s1),
        p2Signals: arrayUnion(s2),
    }, { merge: true });
}

export const pushDemands = async (sessionID, d1, d2) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        p1Demands: arrayUnion(d1),
        p2Demands: arrayUnion(d2),
    }, { merge: true });
}

export const pushHints = async (sessionID, hint) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        Hints: arrayUnion(hint),
    }, { merge: true });
}

export const pushProfits = async (sessionID, profit) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        Profits: arrayUnion(profit),
    }, { merge: true });
}

export const pushTimerForPrices = async (sessionID) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        priceSetTimes: arrayUnion(currentTime),
    }, { merge: true });
}

export const pushTimerForHints = async (sessionID) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await setDoc(docRef, {
        hintAccessTimes: arrayUnion(currentTime),
    }, { merge: true });
}

