import React from "react";
import { ArrowDownIcon, ArrowUpIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

export interface Song {
  id: number;
  title: string;
  artist: string;
  upvotes: number;
  downvotes: number;
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

const SongCard = ({ song }: { song: Song }) => {
  return (
    <div className="flex justify-left flex-wrap md:flex-nowrap p-1 gap-1 items-center py-auto mb-4">
      <div className="bg-base-100 shadow-lg shadow-secondary/20 rounded-md w-full mb-4 md:mb-0 px-8 py-2">
        <span className="text-xl font-bold mr-2">{song.title}</span>{" "}
        <span className="text-secondary/60">{song.artist}</span>
      </div>
      <div className="flex items-right gap-1">
        <button className="flex items-center text-success btn btn-ghost rounded-md">
          <ArrowUpIcon className="h-5 w-5" />
          <span>{song.upvotes}</span>
        </button>
        <button className="flex items-center text-error btn btn-ghost rounded-md">
          <ArrowDownIcon className="h-5 w-5" />
          <span>{song.downvotes}</span>
        </button>
        <button className="btn btn-secondary flex text-black shadow-md shadow-secondary/40">
          <ChevronDoubleUpIcon className="h-5 w-5" />
          Super vote
        </button>
      </div>
    </div>
  );
};

export const SongList = ({ songs }: { songs: Song[] }) => {
  return <div className=" mt-12  max-w-lg">{songs && songs.map(song => <SongCard key={song.id} song={song} />)}</div>;
};
