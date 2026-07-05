import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJN114K3Bk3MPwR6fuOEe3e4gL7Vx1aHM",
  authDomain: "todo-firebase-d4265.firebaseapp.com",
  projectId: "todo-firebase-d4265",
  storageBucket: "todo-firebase-d4265.appspot.com",
  messagingSenderId: "639545701245",
  appId: "1:639545701245:web:d0721296ce4f950e0b9214",
  measurementId: "G-V49VTRQ2CN",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
