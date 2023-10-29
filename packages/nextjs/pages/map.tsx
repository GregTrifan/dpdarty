import React from "react";
import { useEffect, useState } from "react";
import { Party } from "../types/party";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";
import MapComponentList from "~~/components/MapComponentList";

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

const q = query(collection(db, "parties"));

onSnapshot(q, snapshot => {
  console.log(snapshot.docs);
});

const MapPage = () => {
  const [data, setData] = useState<Party[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(q, doc => {
      console.log("test", doc.docs);

      //@ts-ignore
      const dataPartiesArrayFromFirebaseRealTime = [];
      doc.docs.forEach(doc => {
        dataPartiesArrayFromFirebaseRealTime.push({ id: doc.id, ...doc.data() });
      });
      //@ts-ignore
      setData(dataPartiesArrayFromFirebaseRealTime);
    });

    return () => unsub(); // Clean up the listener on unmount
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <div className="mx-auto max-w-xl lg:max-w-6xl">
      <h1 className="text-4xl absolute top-4 text-white mr-52">Map</h1>

      <br />
      <br />
      <br />

      <MapComponentList addresses={data} />
    </div>
  );
};

export default MapPage;
