import "./newChat.css";
import Topbar from "../../components/topbar/Topbar";
import React,{useContext} from "react";
import {chatcontractAddress,chatcontractABI} from "./chatConstants";
import { ethers } from 'ethers';
import Web3 from 'web3';
import web3Connection from "../../web3Connection";
import { testContext } from "../../context/testContext";



function NewChat(){

      let web3 = new Web3(window.ethereum)
       let chatcontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
       const {
        connectedAccount
      } =  useContext(testContext);
    var myMap = {};
      var accounts=[]; 
      chatcontract.getPastEvents('message', {
        fromBlock: 0,
        toBlock: 'latest',

      }, function (err, data) {
        console.log(data);
        // let x = data.length;
        // for (var n = 0; n < x; n++) {
        //   if(!myMap[data[n].returnValues.from]){
        //     // myMap.set(data[n].returnValues.from, true);
        //     myMap[data[n].returnValues.from]=true;
        //     accounts.push(data[n].returnValues.from);
        //   }
        
       
        // }
      });

      


    return (<div>
              <Topbar />
              <h1>{accounts}</h1>
            
              <input type="text" placeholder="address" id="address-send"/><br/>
              <input type="text" placeholder="message" id="msg-send"/><br/>
              

  <button  onClick={sendNewMsg()}>Send </button>
           
             
            </div>
            );
}

export default NewChat;
const  sendNewMsg=()=>{

  console.log("sending msgs");
  var message = document.getElementById("msg-send");
    var to = document.getElementById("address-send");
    console.log(message,to);
  //   const {ethereum}=window;
  //   const provider =new ethers.providers.Web3Provider(ethereum);
  // const signer=provider.getSigner();
  // const mycontract= new ethers.Contract(contractAddress,contractABI,signer);
  // let web3 = new Web3(window.ethereum);
  //   // let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  //  let mycontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
  //   var date = new Date().toLocaleDateString("IN");
  //   var time = new Date().toLocaleTimeString("IN");
  //   time = time.split('.')
  //   var accurateTime = date + ' ' + time[0] + ':' + time[1];

  //   mycontract.methods.sendMessage(to, message, accurateTime).send({ from: connectedAccount }, function (err, transcationHash) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     else {

  //       var decoration = '<div class="row justify-content-start">' +
  //         '<div class="col-4 col-md-auto">' +
  //         '<div class="alert alert-primary" role="alert">' +
  //         message +
  //         '<h6 style="font-size: 0.6em;">send ' + accurateTime + '</h6>' +
  //         '</div>' +
  //         '</div>' +
  //         '</div>'
  //       var buttonText = document.getElementById("groupinputbutton" + to).innerHTML;
  //       document.getElementById("groupinputbutton" + to).remove();
  //       //document.getElementById("button"+det.id).remove();
  //       document.getElementById("messagepart" + to).innerHTML += decoration;
  //       document.getElementById("messagepart" + to).innerHTML += '<div class="input-group mb-0" id="groupinputbutton' + to + '">' +
  //         '<input type="text" class="form-control" placeholder="Type message" id="inputbutton' + to + '"aria-label="Recipien username" aria-describedby="button-addon2" />' +
  //         '<button class="btn btn-warning" type="button" onclick=onSend(this) id="button' + to + '" style="padding-top: .55rem;">' +
  //         'Send' +
  //         '</button>' +
  //         '</div>'
  //       document.getElementById("groupinputbutton" + to).scrollIntoView();

  //     }
  //   });
    
}