/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Party } from "../types/party";
import "firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PlusIcon } from "@heroicons/react/24/outline";
import MapComponentList from "~~/components/MapComponentList";
import { db } from "~~/services/firebase";

const Home = () => {
  const [data, setData] = useState<Party[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddress(value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name + " " + address);
  };

  useEffect(() => {
    const q = query(collection(db, "parties"));
    const unsub = onSnapshot(q, snapshot => {
      console.log("Data", snapshot.docs);

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
      <div className="relative my-24 mx-auto flex justify-center">
        <h1 className="text-4xl absolute top-4 text-white mr-52">Welcome</h1>
        <h1 className="text-9xl font-extrabold relative ml-8">
          <span className="bg-gradient-to-t from-white to-white/10 text-transparent bg-clip-text">Mars</span>
        </h1>
      </div>

      <h5 className="text-2xl mx-3">
        <span className="relative inline-block">
          <span className="bg-gradient-to-t from-white/10 to-white text-transparent bg-clip-text">
            Here are some parties near you...
          </span>
        </span>
      </h5>

      <MapComponentList addresses={data} />

      <div className="flex gap-6 justify-start mt-8">
        <button className="my-auto font-bold text-xl" onClick={() => setShowModal(true)}>
          <span className="btn btn-circle btn-secondary btn-outline">
            <PlusIcon />
          </span>
          <span className="ml-5 relative -top-4">Add a new party</span>
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-2xl font-bold mb-4">Add the party</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name of the Party:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChangeAddress}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {/* <div className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8">
        {Array(4).fill(
          <div className="card bg-base-100 shadow-xl max-w-84">
            <figure>
              <img
                src="https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?cs=srgb&dl=pexels-jerome-govender-2114365.jpg&fm=jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                The Electric Eclipse
                <div className="badge badge-secondary">HOT</div>
              </h2>
              <p>42 Solar Street, London, EC1M 6SN, United Kingdom</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  5 <StarIcon className="text-white h-4 w-4 ml-1" />
                </div>

                <div className="badge badge-warning">$$</div>
              </div>
            </div>
          </div>,
        )}
      </div> */}
    </div>
  );
};

export default Home;
