/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect, useState } from "react";
import { Party } from "../types/party";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import MapComponentList from "~~/components/MapComponentList";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "eth-london-separate.firebaseapp.com",
  projectId: "eth-london-separate",
  storageBucket: "eth-london-separate.appspot.com",
  messagingSenderId: "969391618248",
  appId: "1:969391618248:web:0435b7b6a944abf21dcdfd",
};

/*const app = */ initializeApp(firebaseConfig);

const MapPage = () => {
  const [data, setData] = useState<Party[]>([]);

  useEffect(() => {
    async function fetchData() {
      const db = getFirestore(); // Make sure to initialize your Firestore here
      const querySnapshot = await getDocs(collection(db, "parties"));
      const fetchedData = querySnapshot.docs.map(doc => doc.data() as Party);
      setData(fetchedData);
    }

    fetchData();
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <div className="mx-auto max-w-xl lg:max-w-6xl">
      <h1 className="text-4xl absolute top-4 text-white mr-52">Map</h1>

      <br />
      <br />
      <br />

      <MapComponentList addresses={data} />

      {/* {data.map((item, index) => (
        <MapComponent key={index} address={item.Address} /> // Assuming each item in data has an "address" field
      ))} */}
    </div>
  );

  // async function fetchData() {
  //   const querySnapshot = await getDocs(collection(db, "parties"));
  //   const data = querySnapshot.docs.map(doc => doc.data());
  //   console.log(data);
  // }

  // fetchData();

  // return (
  //   <div className="mx-auto max-w-xl lg:max-w-6xl">
  //     <h1 className="text-4xl absolute top-4 text-white mr-52">Map</h1>
  //     <MapComponent address="1600 Amphitheatre Parkway, Mountain View, CA" />
  //     <MapComponent address="Daszynskiego 19, 31-537 Krakow, Poland" />
  //   </div>
  // );
};

export default MapPage;
