import React from "react";
import Modal from "../Modal";

const UseSuperVote = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal show onClose={onClose}>
      <h1 className="text-4xl text-white/50 font-bold mb-4">Get SuperVote</h1>
      <p>
        Supervotes allows you to directly add your favorite songs in this party&apos;s queue. You can purchase it with
        20 DPDT Tokens. Each SuperVote NFT can be used up to 3 times.
      </p>
      <button className="btn btn-success mt-4">Buy SuperVote NFT</button>
    </Modal>
  );
};

export default UseSuperVote;
