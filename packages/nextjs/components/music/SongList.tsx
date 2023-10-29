import React, { useState } from "react";
import router from "next/router";
import GetSuperVote from "../superVote/GetSuperVote";
import UseSuperVote from "../superVote/UseSuperVote";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useWalletClient } from "wagmi";
import { ArrowDownIcon, ArrowUpIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { db } from "~~/services/firebase";

export interface Song {
  id: number;
  title: string;
  artist: string;
  upvotes: number;
  downvotes: number;
  isInQueue?: boolean;
  superVoted?: boolean;
}
export const mockSongs: Song[] = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist 1",
    upvotes: 10,
    downvotes: 2,
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist 2",
    upvotes: 15,
    downvotes: 5,
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist 3",
    upvotes: 8,
    downvotes: 3,
  },
];
// Function to add a song ID to upvotedSongs in localStorage
const addVotedSong = (songId: string | number, action: string) => {
  let votedSongs = JSON.parse(localStorage.getItem("VotedSongs") || "[]");
  votedSongs.push(`${songId}-${action}`);
  votedSongs = [...new Set(votedSongs)]; // Remove duplicates
  localStorage.setItem("VotedSongs", JSON.stringify(votedSongs));
};
const isSongVoted = (songId: string | number): { voted: boolean; action?: string } => {
  const votedSongs = JSON.parse(localStorage.getItem("VotedSongs") || "[]");
  const upvoteIndex = votedSongs.findIndex((song: string) => song === `${songId}-upvote`);
  const downvoteIndex = votedSongs.findIndex((song: string) => song === `${songId}-downvote`);

  if (upvoteIndex !== -1) {
    return { voted: true, action: "upvote" };
  } else if (downvoteIndex !== -1) {
    return { voted: true, action: "downvote" };
  } else {
    return { voted: false };
  }
};
const SongCard = ({ song, songs }: { song: Song; songs: Song[] }) => {
  const { data: walletClient } = useWalletClient();
  const [showModal, setShowModal] = useState(false);

  const { data: ownedSuperNFTs } = useScaffoldContractRead({
    contractName: "DpDarty",
    functionName: "balanceOf",
    args: [walletClient?.account.address],
  });
  const addSongToQueue = async () => {
    const partyRef = doc(db, "parties", id as string);

    try {
      const updatedSongs = songs.map(s => (s.id === song.id ? { ...s, isInQueue: true, superVoted: true } : s));

      await updateDoc(partyRef, {
        Songs: updatedSongs,
      });

      toast.success("Song added to queue successfully!");
    } catch (error) {
      toast.error("Error adding song to queue");
      console.log(error);
    }
  };
  const [isVoted, setIsVoted] = useState(isSongVoted(song.id));
  const { id } = router.query || "";
  return (
    <div className="flex justify-left bg-base-100 p-2 w-full rounded-md md:p-0 md:bg-transparent shadow-md shadow-secondary/20 md:shadow-transparent flex-wrap md:flex-nowrap gap-3 items-center py-auto mb-4">
      <div className="bg-base-100 min-w-full flex justify-between gap-4 md:shadow-lg md:shadow-secondary/20 rounded-md w-full mb-4 md:mb-0 px-4 py-3">
        <div className="whitespace-nowrap">
          {" "}
          <span className="text-xl font-bold mr-2">{song.title}</span>{" "}
          <span className="text-secondary/60">{song.artist}</span>
        </div>
        <div className="flex justify-end gap-2">
          {song.superVoted && (
            <div className="badge badge-secondary text-black badge-lg whitespace-nowrap my-auto">
              <ChevronDoubleUpIcon className="h-5 w-5" />
            </div>
          )}
          {song.isInQueue && <div className="badge badge-success badge-lg whitespace-nowrap my-auto">IN QUEUE</div>}
        </div>
      </div>

      <div className="flex items-right justify-end md:justify-normal w-full gap-1">
        <button
          onClick={async () => {
            if (!isVoted.voted) {
              const partyRef = doc(db, "parties", id as string);

              try {
                const updatedSongs = songs.map(s => (s.id === song.id ? { ...s, upvotes: s.upvotes + 1 } : s));

                await updateDoc(partyRef, {
                  Songs: updatedSongs,
                });
                addVotedSong(song.id, "upvote");
                setIsVoted({ voted: true, action: "upvote" });
                toast.success("Song upvoted successfully!");
              } catch (error) {
                toast.error("Error upvoting song");
                console.log(error);
              }
            } else {
              toast.error("You've already voted for this song");
            }
          }}
          className={`flex items-center  btn ${
            isVoted.action === "upvote" ? "btn-success" : "btn-ghost text-success"
          } rounded-md`}
        >
          <ArrowUpIcon className="h-5 w-5" />
          <span>{song.upvotes}</span>
        </button>
        <button
          onClick={async () => {
            if (!isVoted.voted) {
              const partyRef = doc(db, "parties", id as string);

              try {
                const updatedSongs = songs.map(s => (s.id === song.id ? { ...s, downvotes: s.downvotes + 1 } : s));

                await updateDoc(partyRef, {
                  Songs: updatedSongs,
                });
                addVotedSong(song.id, "downvote");
                setIsVoted({ voted: true, action: "downvote" });
                toast.success("Song upvoted successfully!");
              } catch (error) {
                toast.error("Error upvoting song");
                console.log(error);
              }
            } else {
              toast.error("You've already voted for this song");
            }
          }}
          className={`flex items-center  btn ${
            isVoted.action === "downvote" ? "btn-error" : "btn-ghost text-error"
          } rounded-md`}
        >
          <ArrowDownIcon className="h-5 w-5" />
          <span>{song.downvotes}</span>
        </button>
        {!song.isInQueue && (
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="btn btn-secondary flex ml-2 text-black shadow-md rounded-md shadow-secondary/40"
          >
            <ChevronDoubleUpIcon className="h-5 w-5" />
            Super vote
          </button>
        )}
        {Number(ownedSuperNFTs) > 0 && showModal && (
          <>
            <UseSuperVote
              addToQueue={addSongToQueue}
              onClose={() => {
                setShowModal(false);
              }}
            />
          </>
        )}
        {!ownedSuperNFTs && showModal && (
          <GetSuperVote
            onClose={() => {
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export const SongList = ({ songs }: { songs: Song[] }) => {
  return (
    <div className=" mt-12  max-w-lg">
      {songs && songs.map(song => <SongCard songs={songs} key={song.id} song={song} />)}
    </div>
  );
};
