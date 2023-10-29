// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DPDF is ERC20, Ownable {
	constructor() ERC20("DPDF", "DPDF") {
		// Mint an initial supply of DPDF tokens to the contract owner
		uint256 initialSupply = 10000000 * 10 ** 18; // 10,000,000 DPDF with 18 decimal places
		_mint(owner(), initialSupply);
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}

	function buyTokens() public payable {
		uint256 ethAmount = msg.value;
		uint256 tokenAmount = ethAmount * 1000; // 1 ETH = 1000 DPDF tokens

		require(tokenAmount > 0, "You need to send ETH to buy tokens");
		require(
			balanceOf(owner()) >= tokenAmount,
			"Insufficient DPDF tokens in the contract"
		);

		// Transfer the purchased tokens to the user
		_transfer(owner(), msg.sender, tokenAmount);
	}

	function burn(uint256 amount) public onlyOwner {
		_burn(msg.sender, amount);
	}
}
