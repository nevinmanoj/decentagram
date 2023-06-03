// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferContract {
    address payable public recipient;
    
     receive() external payable {
        
    }
     event Cheer(address from, address receiver, uint amount, string message);

    function transfer(address payable _recipient) external {
        require(_recipient != address(0), "Invalid recipient address");
        require(address(this).balance > 0, "Contract has no balance to transfer");

        recipient = _recipient;
        recipient.transfer(address(this).balance);
    }
    function transferNew(address payable _recipient, uint256 _amount,string memory _message) external {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Invalid amount");
            emit Cheer(msg.sender,_recipient,_amount,_message);
        recipient = _recipient;
        recipient.transfer(_amount);
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
}
