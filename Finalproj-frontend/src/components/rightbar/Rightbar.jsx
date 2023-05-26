import "./rightbar.css";
import { Users } from "../../dummyData";
import Web3 from 'web3';
import { chatcontractAddress, chatcontractABI } from "../../pages/chat/chatConstants";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getEthereumContract } from "../../context/testContext";
import { useContext, useState, useEffect } from "react";
import { testContext } from "../../context/testContext";




import CloseFriend from "../closeFriend/CloseFriend";

export default function Rightbar({ profile }) {

  const [acs, setacs] = useState([[], []]);

  var accounts = [];
  var accountnames = [];
  var myMap = {};

  let web3 = new Web3(window.ethereum)
  let chatcontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
  let {
    connectedAccount
  } = useContext(testContext);

  useEffect(() => {
    chatcontract.getPastEvents('message', {
      fromBlock: 0,
      toBlock: 'latest',

    }, async (err, data) => {
      // console.log(data);
      let x = data.length;

      var contract = await getEthereumContract();
      // var username = await contract.getUsername()

      var username = "";

      for (var n = 0; n < x; n++) {

        if (data[n].returnValues.from.toLowerCase() === connectedAccount) {
          if (!myMap[data[n].returnValues.to.toLowerCase()]) {
            myMap[data[n].returnValues.to.toLowerCase()] = true;

            accounts.push(data[n].returnValues.to.toLowerCase());
            // username = await contract.getUserName(accounts[n]);
            // console.log(data[n].returnValues.to.toLowerCase().toString());
            username = await contract.getUserName(data[n].returnValues.to.toLowerCase().toString());
            // console.log(username);
            // var username = contract.getUserName(accounts[n]);

            if (username === null) {
              accountnames.push("No name");
            }

            else {
              accountnames.push(username)
            }


          }

        }

        if ((data[n].returnValues.to.toLowerCase() === connectedAccount)) {


          if (!myMap[data[n].returnValues.from.toLowerCase()]) {

            myMap[data[n].returnValues.from.toLowerCase()] = true;

            accounts.push(data[n].returnValues.from.toLowerCase());
            // username = await contract.getUserName(accounts[n]);


            username = await contract.getUserName(data[n].returnValues.from.toLowerCase().toString());


            if (username === null) {
              accountnames.push("No name");
            }

            else {
              accountnames.push(username);
            }




          }

        }
      }


      // console.log(accountnames);
      setacs([accounts, accountnames]);
    });
  }, [connectedAccount]);

  console.log((acs[0]));
  const ProfileRightbar = () => {

    const navigate = useNavigate();

    function handleClick() {
      navigate('/testChat');
    }

    return (
      <>


        <h2 onClick={handleClick} className="chat-heading">Chat</h2>


        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {acs[0].map((u, index) => (

            <CloseFriend key={u.id} name={acs[1][index]} id={u} />
          ))}
        </ul>

      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* {profile ? <ProfileRightbar /> : <HomeRightbar />} */}
        <ProfileRightbar />
      </div>
    </div>
  );
}
