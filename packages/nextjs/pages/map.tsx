import React from "react";
import { useEffect, useState } from "react";
import { Party } from "../types/party";
import "firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import MapComponentList from "~~/components/MapComponentList";
import { db } from "~~/services/firebase";

const q = query(collection(db, "parties"));

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
  }, []);

  return (
    <div className="mx-auto max-w-xl lg:max-w-6xl">
      <MapComponentList addresses={data} />
    </div>
  );
};

export default MapPage;
