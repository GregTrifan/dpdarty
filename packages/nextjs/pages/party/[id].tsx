import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "~~/services/firebase";

const ClubPage = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const router = useRouter();
  const { id } = router.query || "";

  useEffect(() => {
    const q = query(collection(db, "parties")); // HACK HACK HACK (no need to request all but Firebase API blah blah blah)
    onSnapshot(q, snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.id == id) {
          console.log(doc.data());
          setName(doc.data().Name);
          setAddress(doc.data().Address);
        }
      });
    });
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl">{name}</h1>
      <p>Address: {address}</p>
      <p className="font-mono">Place ID: {id}</p>
    </div>
  );
};

export default ClubPage;
