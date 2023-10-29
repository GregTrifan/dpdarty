import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "eth-london-separate.firebaseapp.com",
  projectId: "eth-london-separate",
  storageBucket: "eth-london-separate.appspot.com",
  messagingSenderId: "969391618248",
  appId: "1:969391618248:web:0435b7b6a944abf21dcdfd",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
