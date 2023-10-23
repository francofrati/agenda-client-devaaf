// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZ2qQXCNWIZ_522zQ-xfbYxLCKqxTw_dc",
    authDomain: "agenda---devaaf.firebaseapp.com",
    databaseURL: "https://agenda---devaaf-default-rtdb.firebaseio.com",
    projectId: "agenda---devaaf",
    storageBucket: "agenda---devaaf.appspot.com",
    messagingSenderId: "554124960617",
    appId: "1:554124960617:web:7ddf8742e08cb80a19d3f8",
    measurementId: "G-R3TKGMM1PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app)
// const analytics = getAnalytics(app);