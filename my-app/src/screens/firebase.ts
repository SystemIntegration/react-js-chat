import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDr7smHss-Uf2l2VFeUkz1ITUFvuHXXZZY",
    authDomain: "chat-application-5fb21.firebaseapp.com",
    projectId: "chat-application-5fb21",
    storageBucket: "chat-application-5fb21.appspot.com",
    messagingSenderId: "582514318893",
    appId: "1:582514318893:web:f3de70c3db041c6716e2a4",
    measurementId: "G-8CEYY2XV26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
