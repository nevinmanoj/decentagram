// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract cheer {
    

   
    
     event newCheer(address from, address indexed receiver, uint amount, string message, uint256 timestamp, string indexed postid);
    

   
    function sendEth(address payable recipient, string memory _postid, string memory _message) external payable {
        emit newCheer(msg.sender,recipient,msg.value,_message, block.timestamp,_postid);
        recipient.transfer(msg.value);
    }
    

    
}