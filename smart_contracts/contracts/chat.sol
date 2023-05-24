// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract chat{
event message(address indexed from ,string message ,address to,string timestamp);
function sendMessage(address _from,address _to,string memory _message,string memory time) public {

    emit message(_from,_message,_to,time);
}
    
}
