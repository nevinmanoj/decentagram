import "./testChat.css";
import { useContext, useState, useEffect } from "react";
import { testContext } from "../../context/testContext";
import Web3 from 'web3';
import { chatcontractAddress, chatcontractABI } from "../chat/chatConstants";
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatWindow from "./chatWindow";
import { getEthereumContract } from "../../context/testContext";


export default function TestChat() {
  const [msg, setmsg] = useState();
  const [addr, setaddr] = useState();
  const [acs, setacs] = useState([[], {}]);
  const [chatDisp, setchatDisp] = useState(["", ""]);


  let web3 = new Web3(window.ethereum)
  let chatcontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
  let {
    connectedAccount
  } = useContext(testContext);


  var accounts = [];
  var accountnames = [];
  var myMap = {};

 
  const getMessages=async()=>{
    chatcontract.getPastEvents('message', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: {
        $or: [
          { filter: { from: [connectedAccount] } },
          { filter: { to: [connectedAccount] } }
        ]
      },

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
            username = await contract.getUserName(data[n].returnValues.to.toLowerCase().toString());

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
    }
  useEffect(() => {
    const messageEvent = chatcontract.events.message();
    messageEvent.on('data', async(event) =>{
      console.log("blockchain updated");
       getMessages();
    });
    getMessages();
   
    
  }, [connectedAccount]);
  
  
  function expand(a, b) {

    setchatDisp([a, b]);

  }

  function sendNewMsg() {
    var message = msg;
    var address = addr;
    alert(address + ":" + message);
    var date = new Date().toLocaleDateString("IN");
    var time = new Date().toLocaleTimeString("IN");
    time = time.split('.')
    var accurateTime = date + ' ' + time[0] + ':' + time[1];
    chatcontract.methods.sendMessage(connectedAccount, address, message, accurateTime).send({ from: connectedAccount }, function (err, transcationHash) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("message sent,trnx hash:" + transcationHash);
      }
    });
  }


  return (<div>
    <Topbar />

    <div class="chat-outer">

      <div class="chat-list" >
        <h6>Current A/c: <br />{connectedAccount}</h6>
        {/* {console.log(connectedAccount)} */}
        <input type="text" placeholder="address" id="address-send" onChange={(e) => setaddr(e.target.value)} /><br />
        <input type="text" placeholder="message" id="msg-send" onChange={(e) => setmsg(e.target.value)} /><br />
        <div class="btn-send" onClick={sendNewMsg}><span className="text-class">Send</span></div>

        <h2>Messages</h2>
        <div id="rec-msgs">



          {acs[0].map((item, index) => (



            <div key={item} class="account" onClick={() => expand(acs[0][index], acs[1][index])}>{acs[1][index].split("@")[0]}
            </div>



          ))}




        </div>
      </div>


      <div class="chat-window">

        {chatDisp[0] === "" ? "Select Chat" : <ChatWindow parameter={chatDisp} />}
      </div>


    </div>
  </div >
  );
}