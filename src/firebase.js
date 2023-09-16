import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCvPdM6sjXi_49Tiil6N7CAHhayX6PazOQ",
  authDomain: "spelling-app-dev.firebaseapp.com",
  projectId: "spelling-app-dev",
  storageBucket: "spelling-app-dev.appspot.com",
  messagingSenderId: "975198042328",
  appId: "1:975198042328:web:064c4ee5a1d6c8cd553fad",
  measurementId: "G-PSWYF7S4GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db_firestore = getFirestore(app);

export const auth = getAuth(app);

export default app;