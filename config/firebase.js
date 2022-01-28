import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEaBgGERbMsF7FWHBgDF61oqtdpKugdck",
  authDomain: "crypto-app-b8c49.firebaseapp.com",
  projectId: "crypto-app-b8c49",
  storageBucket: "crypto-app-b8c49.appspot.com",
  messagingSenderId: "942876868420",
  appId: "1:942876868420:web:1d35dc5c820864a08c6111",
  measurementId: "G-NKW6Q677T3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();