// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract cheer {
    

   
    
     event newCheer(address from, address indexed receiver, uint amount, string message,string postid, uint256 timestamp);
    

   
    function sendEth(address payable recipient, string memory _pid, string memory _message) external payable {
        emit newCheer(msg.sender,recipient,msg.value,_message,_pid, block.timestamp);
        recipient.transfer(msg.value);
    }
    

    
}