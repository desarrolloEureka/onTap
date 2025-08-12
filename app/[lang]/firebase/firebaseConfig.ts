import firebase from "firebase/compat/app";
import { config as configDotenv } from "dotenv";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

export const wompiConfig = {
  WOMPI_PUBLIC_KEY: process.env.NEXT_PUBLIC_WOMPI_KEY,
  WOMPI_PRIVATE_KEY: process.env.NEXT_PUBLIC_WOMPI_PRIVATE_KEY,
  WOMPI_BASE_URL: process.env.NEXT_PUBLIC_WOMPI_BASE_URL,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");
const dataBase = firebaseApp.firestore();
const auth = firebase.auth();

export { dataBase, auth, firebaseConfig, secondaryApp };