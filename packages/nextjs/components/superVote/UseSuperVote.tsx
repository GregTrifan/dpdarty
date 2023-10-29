import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useWalletClient } from "wagmi";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const UseSuperVote = ({ onClose, addToQueue }: { onClose: () => void; addToQueue: () => Promise<void> }) => {
  const { data: walletClient } = useWalletClient();
  const { data: ownedSuperNFTs } = useScaffoldContractRead({
    contractName: "DpDarty",
    functionName: "getOwnedNFTs",
    args: [walletClient?.account.address],
  });
  const [loading, setIsLoading] = useState(false);
  const { data: dpdarty } = useScaffoldContract({
    contractName: "DpDarty",
    walletClient: walletClient,
  });
  const [usesLeft, setUsesLeft] = useState<number>(0);
  useEffect(() => {
    const fetchNFTUsages = async () => {
      if (!dpdarty || !ownedSuperNFTs) return;

      const usagePromises = ownedSuperNFTs.map(async nftId => {
        const usage = await dpdarty.read.getNFTUsage([nftId]);
        return 3 - Number(usage);
      });

      const usages = await Promise.all(usagePromises);

      const totalUsesLeft = usages.reduce((total, uses) => total + uses, 0);
      setUsesLeft(totalUsesLeft);
    };

    fetchNFTUsages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownedSuperNFTs, loading]);

  return (
    <Modal show onClose={onClose}>
      <h1 className="text-4xl text-white/50 font-bold mb-4">SuperVote</h1>
      <p>You&apos;ve got {usesLeft} SuperVotes left</p>
      <button
        disabled={loading || !ownedSuperNFTs || ownedSuperNFTs.length === 0}
        onClick={async () => {
          setIsLoading(true);

          // Find an NFT with uses left
          let nftIdToUse = null;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          for (const nftId of ownedSuperNFTs!) {
            const usage = await dpdarty?.read.getNFTUsage([nftId]);
            if (Number(usage) < 3) {
              nftIdToUse = nftId;
              break; // Use the first NFT with available uses
            }
          }

          if (nftIdToUse !== null) {
            await dpdarty?.write.useNFTForSuperVote([nftIdToUse]).then(async () => {
              await addToQueue();
            });
          }

          setIsLoading(false);
          onClose();
        }}
        className="btn btn-success mt-4"
      >
        {loading && <span className="loading loading-spinner"></span>}
        Use Supervote
      </button>
    </Modal>
  );
};

export default UseSuperVote;
