import React from "react";
import { useEffect, useState } from "react";
import { Party } from "../types/party";
import "firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import MapComponentList from "~~/components/MapComponentList";
import { db } from "~~/services/firebase";

const q = query(collection(db, "parties"));

// onSnapshot(q, snapshot => {
//   console.log(snapshot.docs);
// });

const MapPage = () => {
  const [data, setData] = useState<Party[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(q, snapshot => {
      console.log("test", snapshot.docs);

      //@ts-ignore
      const dataPartiesArrayFromFirebaseRealTime = [];
      snapshot.docs.forEach(doc => {
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
