import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const secretName = 'projects/975198042328/secrets/Firebase_API_Key/versions/1';

async function fetchSecret() {
  try {
    const response = await fetch(`https://secretmanager.googleapis.com/v1/${secretName}:access`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your access token or API key
      },
    });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch secret');
    // }

    const secretData = await response.json();
    console.log('Secret Data:', secretData);

  } catch (error) {
    console.error('Error fetching secret KKK:', error);
  }
}

fetchSecret();

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