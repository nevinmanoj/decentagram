// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract cheer {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
   

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
       

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}