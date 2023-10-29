import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SongList, mockSongs } from "~~/components/music/SongList";
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
    <>
      <div className="mt-8">
        <h1 className="text-5xl text-center font-black text-secondary">{name}</h1>

        <div className="md:mx-12 max-w-md mx-auto">
          <h4 className="text-3xl font-bold mt-8">Vote for your favorite song</h4>
          <SongList songs={mockSongs} />
          <div className="flex gap-6 justify-start mt-8">
            <button className="btn btn-circle btn-secondary btn-outline">
              <PlusIcon />
            </button>
            <h5 className="my-auto font-bold text-xl">Add Track</h5>
          </div>
        </div>
      </div>

      <div>
        <p className="font-mono mt-[300px]">Address: {address}</p>
        <p className="font-mono">Place ID: {id}</p>
      </div>
    </>
  );
};

export default ClubPage;
