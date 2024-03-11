import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDLnaZlKbxx4pEp7wZyUOZ5SmP6GlgA3vU",
    authDomain: "todoapp-8e17c.firebaseapp.com",
    projectId: "todoapp-8e17c",
    storageBucket: "todoapp-8e17c.appspot.com",
    messagingSenderId: "284966206729",
    appId: "1:284966206729:web:883a51a9d279b66f0ba7d8",
    measurementId: "G-EENR7YKQM3"
  };

  
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
export {db}
export {auth}
export {storage}