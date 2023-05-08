import "./testChat.css";
import { useContext,useState,useEffect } from "react";
import { testContext } from "../../context/testContext";
import Web3 from 'web3';
import {chatcontractAddress,chatcontractABI} from "../chat/chatConstants";
import React from "react";


export default function TestChat() {
    const [msg, setmsg] = useState();
    const [addr, setaddr] = useState();
    const [acs, setacs] = useState([[],{}]);
    // const [msgList, setmsgList] = useState({});
  
    
    
    
    let web3 = new Web3(window.ethereum)
    let chatcontract = new web3.eth.Contract(chatcontractABI, chatcontractAddress);
       const {
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
              
                if(data[n].returnValues.from===connectedAccount){
                    console.log("Sameacc");
                    continue;
                }
              
                if((data[n].returnValues.to!==connectedAccount)){
                
                   
              if(!myMap[data[n].returnValues.from]){
                
                myMap[data[n].returnValues.from]=true;
               
                    accounts.push(data[n].returnValues.from);
                    msgs[data[n].returnValues.from]=[];
                    // console.log(msgs[data[n].returnValues.from]);
                
                   
                
              }
              msgs[data[n].returnValues.from].push(data[n].returnValues.message);
            
            }
            }
    
          
            for(var m=0;m<accounts.length;m++){
                // console.log(accounts[m]);
                // console.log(msgs[accounts[m]]);
    
            }
            setacs([accounts,msgs]);
            // setmsgList(msgs);
           
            
           
          });
    }, [connectedAccount]);
    

      function sendNewMsg(){
        var message=msg;
        var address=addr;
        alert(address+":"+message);
        var date = new Date().toLocaleDateString("IN");
        var time = new Date().toLocaleTimeString("IN");
        time = time.split('.')
        var accurateTime = date + ' ' + time[0] + ':' + time[1];

        chatcontract.methods.sendMessage(address, message, accurateTime).send({ from: connectedAccount }, function (err, transcationHash) {
            if (err) {
                console.log(err);
            }
            else{
                console.log("message sent,trnx hash:"+transcationHash);
            }
        });
      }

    return(<div>
        <h4>Current Ac:{connectedAccount}</h4>
        <input type="text" placeholder="address" id="address-send" onChange={(e) => setaddr(e.target.value)}/><br/>
        <input type="text" placeholder="message" id="msg-send" onChange={(e) => setmsg(e.target.value)}/><br/>
        <div class="btn-send" onClick={sendNewMsg}>send</div>

        <h2>Messages</h2>
        <div id="rec-msgs">
        <ul>
            
           {acs[0].map((item, index) => (
                    <li key={item}>{item}  :<br/> <ul>
                          
                            {acs[1][item].map((ms, ii) => (
                    <li key={ii}>{ms}</li>
                ))}

                        </ul></li>
                ))}
        </ul>
        </div>
    </div>);
}