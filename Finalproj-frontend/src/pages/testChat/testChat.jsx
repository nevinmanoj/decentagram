import "./testChat.css";
import { useContext,useState,useEffect } from "react";
import { testContext } from "../../context/testContext";
import Web3 from 'web3';
import {chatcontractAddress,chatcontractABI} from "../chat/chatConstants";
import React from "react";
import Topbar from "../../components/topbar/Topbar";


export default function TestChat() {
    const [msg, setmsg] = useState();
    const [addr, setaddr] = useState();
    const [acs, setacs] = useState([[],{}]);
    // const [msgList, setmsgList] = useState({});
  
    
    
    
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
                    
                    continue;
                }
              
                if((data[n].returnValues.to.toLowerCase()===connectedAccount)){
                
                   
              if(!myMap[data[n].returnValues.from]){
                
                myMap[data[n].returnValues.from]=true;
               
                    accounts.push(data[n].returnValues.from);
                    msgs[data[n].returnValues.from]=[];
                    
                
                   
                
              }
              msgs[data[n].returnValues.from].push(data[n].returnValues.message);
            
            }
            }
    
          
            
            setacs([accounts,msgs]);
           
           
            
           
          });
    }, [connectedAccount]);

    function addMessages(a){

    }
    

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
      <Topbar />
        <h4>Current Ac:{connectedAccount}</h4>
        <input type="text" placeholder="address" id="address-send" onChange={(e) => setaddr(e.target.value)}/><br/>
        <input type="text" placeholder="message" id="msg-send" onChange={(e) => setmsg(e.target.value)}/><br/>
        <div class="btn-send" onClick={sendNewMsg}>send</div>

        <h2>Messages</h2>
        <div id="rec-msgs">
        <ul>
            
           {acs[0].map((item, index) => (
                    <li key={item}  class="account">{item}  :<br/> <ul>
                          
                            {acs[1][item].map((ms, ii) => (
                    <li key={ii}>{ms}</li>
                ))}

                        </ul></li>
                ))}
        </ul>
        {acs[0].map((ac,i)=>(
        
        
        <div class="accordion-item p-3  border-primary bg-dark"> 
        <h2 class="accordion-header" id="flush-heading' + ac + '">
        <button id="' + ac + '"class="accordion-button collapsed" type="button" onclick={addMessages(this)} data-bs-toggle="collapse" data-bs-target="#flush-collapse' + ac + '" aria-expanded="false" aria-controls="flush-collapse' + ac + '">
        {ac} 
        </button>
        </h2>
        <div id="flush-collapse' + ac + '" class="accordion-collapse collapse" aria-labelledby="flush-heading' + ac + '" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body" id="messagepart' + ac + '">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first items accordion body.</div>
        </div>
        </div>
            
            
            ))}
        

        
        </div>
    </div>);
}