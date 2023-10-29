import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../../components/Modal";
import { collection, onSnapshot, query } from "firebase/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Song, SongList } from "~~/components/music/SongList";
import { db } from "~~/services/firebase";

const ClubPage = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [songs, setSongs] = useState<Song[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  const handleChangeArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setArtist(value);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name + " " + address);

    const newSongData: Song = {
      id: Math.floor(Math.random() * 100000000), // random-ish ID
      artist: artist,
      title: title,
      upvotes: 0,
      downvotes: 0,
    };

    console.log(newSongData);

    const partyRef = doc(db, "parties", id as string);

    try {
      await updateDoc(partyRef, {
        Songs: arrayUnion(newSongData),
      });
      console.log("Song added successfully!");
    } catch (error) {
      console.error("Error adding song:", error);
    }

    setShowModal(false);
    setArtist("");
    setTitle("");
  };

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
          setSongs(doc.data().Songs);
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
          <SongList songs={songs} />
          <div className="flex gap-6 justify-start mt-8">
            <button className="my-auto font-bold text-xl" onClick={() => setShowModal(true)}>
              <span className="btn btn-circle btn-secondary btn-outline">
                <PlusIcon />
              </span>
              <span className="ml-5 relative -top-4">Suggest a song</span>
            </button>
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-4xl text-white/50 font-bold mb-4">Suggest a song</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Artist:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={artist}
              onChange={handleChangeArtist}
              className="w-full p-2 border rounded input input-bordered"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium">
              Title:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={title}
              onChange={handleChangeTitle}
              className="w-full p-2 border rounded input input-bordered"
              required
            />
          </div>
          <div>
            <button type="submit" className="px-8 py-2 btn btn-secondary text-black rounded-xl">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <div>
        <p className="font-mono mt-[300px]">Address: {address}</p>
        <p className="font-mono">Place ID: {id}</p>
      </div>
    </>
  );
};

export default ClubPage;
