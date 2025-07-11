// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Faucet {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function withdraw(uint _amount) public {
        require(_amount <= 0.1 ether, "Can't Withdraw more than 0.1 ETH");
        payable(msg.sender).transfer(_amount);
    }
    receive() external payable {}

    function withdrawAll() public {
        require(msg.sender == owner, "only owner can withdraw all funds");
        payable(owner).transfer(address(this).balance);
    }
}
