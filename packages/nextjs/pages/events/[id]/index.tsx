import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SongList, mockSongs } from "~~/components/music/SongList";

const EventManagement = () => {
  return (
    <div className="mt-8">
      <h1 className="text-5xl text-center font-black text-secondary">X Event</h1>

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
  );
};

export default EventManagement;
