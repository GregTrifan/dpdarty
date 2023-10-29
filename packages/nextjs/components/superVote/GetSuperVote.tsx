import React from "react";
import Modal from "../Modal";
import { parseEther } from "viem";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const GetSuperVote = ({ onClose }: { onClose: () => void }) => {
  const { writeAsync: writeBuyNFT, isLoading: isBuyNFTLoading } = useScaffoldContractWrite({
    contractName: "DpDarty",
    functionName: "payForSuperVote",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  const { data: DartyData } = useDeployedContractInfo("DpDarty");
  const { writeAsync: writeGetAllowance, isLoading: isAllowanceLoading } = useScaffoldContractWrite({
    contractName: "DPDF",
    functionName: "approve",
    args: [DartyData?.address, parseEther("20")],
  });
  return (
    <Modal show onClose={onClose}>
      <h1 className="text-4xl text-white/50 font-bold mb-4">Get SuperVote</h1>
      <p>
        Supervotes allows you to directly add your favorite songs in this party&apos;s queue. You can purchase it with
        20 DPDT Tokens. Each SuperVote NFT can be used up to 3 times.
      </p>
      <button
        disabled={isBuyNFTLoading || isAllowanceLoading}
        className="btn btn-success mt-4"
        onClick={async () => {
          await writeGetAllowance().then(async () => {
            await writeBuyNFT().then(() => {
              onClose();
            });
          });
        }}
      >
        {(isBuyNFTLoading || isAllowanceLoading) && <span className="loading loading-spinner"></span>}
        Buy SuperVote NFT
      </button>
    </Modal>
  );
};

export default GetSuperVote;
