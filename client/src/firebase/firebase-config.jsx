import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyACH-gopvf_sKWUb7lTGdnHMJGwM2odfXk",
    authDomain: "infinity-blogging.firebaseapp.com",
    projectId: "infinity-blogging",
    storageBucket: "infinity-blogging.appspot.com",
    messagingSenderId: "454232058581",
    appId: "1:454232058581:web:5c4d6afce54174aa51d05c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)