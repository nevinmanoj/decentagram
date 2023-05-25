// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract test{
    uint256 public usercount;
  
   
 
 struct User {
    string username;
    string sign;
    address useraddress; 
 }
mapping(address => User) private user;

constructor(){
    usercount=0;

}

function regUser(string memory _username ,string memory _sign) public{
    require(
            user[msg.sender].useraddress ==
                address(0x0000000000000000000000000000000000000000),
            "already registered"
        );
 usercount++;
 user[msg.sender].username=_username;
 user[msg.sender].sign=_sign;
 user[msg.sender].useraddress=msg.sender;
}


function getUserCount() public view returns(uint256){
 return usercount;
}


function getSignatureHash() public view returns (string memory) {
        require(msg.sender == user[msg.sender].useraddress, "Not allowed");

        return user[msg.sender].sign;
}
function getUserAddress() public view returns (address) {
        return user[msg.sender].useraddress;
}
function getUserName(address addr) public view returns (string memory) {
        return user[addr].username;
}
}