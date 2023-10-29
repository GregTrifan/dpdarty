// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DpDarty is ERC721, ERC721Burnable, Ownable {
	uint256 private _nextTokenId;
	uint256 private constant maxUsagePerNFT = 3;

	IERC20 public dpdfToken; // ERC20 token for SuperVotes

	struct NftUsage {
		address user;
		uint256 usages;
	}

	mapping(uint256 => NftUsage) private nftUsages;

	constructor(address _dpdfToken) ERC721("DpDarty", "DPDT") Ownable() {
		dpdfToken = IERC20(_dpdfToken);
	}

	function safeMint(address to) public onlyOwner {
		uint256 tokenId = _nextTokenId++;
		_safeMint(to, tokenId);
		nftUsages[tokenId] = NftUsage(to, 0);
	}

	function useNFTForSuperVote(uint256 tokenId) public {
		require(_exists(tokenId), "NFT does not exist");
		require(
			nftUsages[tokenId].user == msg.sender,
			"You do not own this NFT"
		);
		require(
			nftUsages[tokenId].usages < maxUsagePerNFT,
			"NFT usage limit reached"
		);

		// Perform the SuperVote action here

		nftUsages[tokenId].usages++;
	}

	function getNFTUsage(uint256 tokenId) public view returns (uint256) {
		require(_exists(tokenId), "NFT does not exist");
		return nftUsages[tokenId].usages;
	}

	function payForSuperVote() public {
		// Perform the SuperVote payment using DPDF tokens here
		uint256 amount = 20 ether;
		require(
			dpdfToken.transferFrom(msg.sender, address(this), amount),
			"DPDF transfer failed"
		);

		// Mint a DpDarty (DPDT) NFT for the user
		uint256 tokenId = _nextTokenId++;
		_safeMint(msg.sender, tokenId);
		nftUsages[tokenId] = NftUsage(msg.sender, 0);
	}

	function withdrawDPDF(uint256 amount) public onlyOwner {
		// Withdraw DPDF tokens from the contract
		require(dpdfToken.transfer(owner(), amount), "DPDF transfer failed");
	}
}
