import "./testChat.css";
import { useContext,useState,useEffect } from "react";
import { testContext } from "../../context/testContext";
import Web3 from 'web3';
import {chatcontractAddress,chatcontractABI} from "../chat/chatConstants";
import React from "react";
import Topbar from "../../components/topbar/Topbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatWindow from "./chatWindow";


export default function TestChat() {
    const [msg, setmsg] = useState();
    const [addr, setaddr] = useState();
    const [acs, setacs] = useState([[],{}]);
    const [chatDisp, setchatDisp] = useState("");
    
  
    
    
    
    let web3 = new Web3(window.ethereum)
    let chatcontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
       let {
        connectedAccount
      } =  useContext(testContext);
    var accounts=[]; 
    var myMap={};
    
    var msgs={};
    useEffect(() => {
         chatcontract.getPastEvents('message', {
            fromBlock: 0,
            toBlock: 'latest',
    
          },function (err, data) {
            // console.log(data);
            let x = data.length;
            for (var n = 0; n < x; n++) {
               
                if(data[n].returnValues.from.toLowerCase()===connectedAccount){
                  if(!myMap[data[n].returnValues.to]){
                    myMap[data[n].returnValues.to]=true;
               
                    accounts.push(data[n].returnValues.to);
                    
                    msgs[data[n].returnValues.to]=[[]];
                    
                  }
                 
                  msgs[data[n].returnValues.to].push([data[n].returnValues.message,"snd"]);
                }
              
                if((data[n].returnValues.to.toLowerCase()===connectedAccount)){
                
                   
              if(!myMap[data[n].returnValues.from]){
                
                myMap[data[n].returnValues.from]=true;
               
                    accounts.push(data[n].returnValues.from);
                   
                    msgs[data[n].returnValues.from]=[[]];
                
                   
                
              }
              
              msgs[data[n].returnValues.from].push([data[n].returnValues.message,"rec"]);
            }
            }
    
          
            
            setacs([accounts,msgs]);
           
           
            
           
          });
    }, [connectedAccount]);

    
    function expand(a){
      
      setchatDisp(a);

    }

      function sendNewMsg(){
        var message=msg;
        var address=addr;
        alert(address+":"+message);
        var date = new Date().toLocaleDateString("IN");
        var time = new Date().toLocaleTimeString("IN");
        time = time.split('.')
        var accurateTime = date + ' ' + time[0] + ':' + time[1];
        // var fixedaccount='0x5419b6A3CFb21678E1D0D33650bD78f14dBeD8D7';
        // const account = web3.eth.accounts.privateKeyToAccount('6f7838bf40d713eea51030028ebe046057370cf15c846e20e4cf66f09a5f5cc4');
        chatcontract.methods.sendMessage(connectedAccount,address, message, accurateTime).send({ from: connectedAccount }, function (err, transcationHash) {
            if (err) {
                console.log(err);
            }
            else{
                console.log("message sent,trnx hash:"+transcationHash);
            }
        });
      }
      

    return(<div>
      <Topbar />
      
      <div class="chat-outer">
        
      <div class="chat-list" >
        <h6>Current Ac: <br />{connectedAccount}</h6>
        <input type="text" placeholder="address" id="address-send" onChange={(e) => setaddr(e.target.value)}/><br/>
        <input type="text" placeholder="message" id="msg-send" onChange={(e) => setmsg(e.target.value)}/><br/>
        <div class="btn-send" onClick={sendNewMsg}>send</div>

        <h2>Messages</h2>
        <div id="rec-msgs">
       


{acs[0].map((item, index) => (
                    <div key={item}  class="account" onClick={()=>expand(item)}>{item} 
                          
                    
                       </div>
                ))}
    
         

      
    </div>
    </div>


    <div class="chat-window">
      
    {chatDisp===""?"Select Chat":<ChatWindow parameter={chatDisp}/>}
     </div> 

     
        </div>
        </div>
    );
}