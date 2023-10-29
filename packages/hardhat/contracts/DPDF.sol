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

	function burn(uint256 amount) public onlyOwner {
		_burn(msg.sender, amount);
	}
}
