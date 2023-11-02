
import {app, firestore} from './firebaseConfig';
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";

export const createUser = async (sessionID, fullName) => {
    const data = {
        fullName: fullName,
        hints: [],
        p1prices: [],
        p2prices: [],
        p1signals: [],
        p2signals: []
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
    await docRef.set({
        p1Prices: app.firestore.FieldValue.arrayUnion(p1),
        p2Prices: app.firestore.FieldValue.arrayUnion(p2),
    }, { merge: true });
}

export const pushSignals = async (sessionID, s1, s2) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await docRef.set({
        p1Signals: app.firestore.FieldValue.arrayUnion(s1),
        p2Signals: app.firestore.FieldValue.arrayUnion(s2),
    }, { merge: true });
}

export const pushDemands = async (sessionID, d1, d2) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await docRef.set({
        p1Demands: app.firestore.FieldValue.arrayUnion(d1),
        p2Demands: app.firestore.FieldValue.arrayUnion(d2),
    }, { merge: true });
}

export const pushHints = async (sessionID, hint) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await docRef.set({
        Hints: app.firestore.FieldValue.arrayUnion(hint),
    }, { merge: true });
}

export const pushProfits = async (sessionID, profit) => {
    const docRef = doc(collection(firestore, 'Users'), sessionID);
    await docRef.set({
        Profits: app.firestore.FieldValue.arrayUnion(profit),
    }, { merge: true });
}

