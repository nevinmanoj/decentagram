
import './dev.css'
import React, { useState,useEffect,useContext} from 'react';

import Web3 from 'web3';
import {
    getFirestore, collection, doc,updateDoc, getDocs
  } from 'firebase/firestore'; 
import Topbar from '../../components/topbar/Topbar';

 import { cheercontractAddress, cheercontractABI } from "./cheerConst";
import { Contract } from 'ethers';
import { testContext } from '../../context/testContext';

 
async function addArrayToDocuments(e)  {
  console.log("uncomment and write code ");
    try {
         const db = getFirestore();
        
       const querySnapshot = await getDocs(collection(db, "users"));
       querySnapshot.forEach(async(cdoc) => {
         const ref = doc(db, "users",cdoc.id);
   
       await updateDoc(ref, {
         following: []
       });
       });
      
  
       console.log('data added to all documents successfully.');
    } catch (error) {
      console.error('Error adding array to documents:', error);
    }
  }

  

 
  export default function DevDash(){
   
    return(<div>
        <Topbar/>
        <h2>DevDash</h2>
        <div class="btn"  onClick={addArrayToDocuments}>Add</div>
       <EthTransferComponent />
    </div>)
  }



  
  // Assuming you have a web3 provider instance

  
  const EthTransferComponent = () => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const {connectedAccount}=useContext(testContext);
    const handleRecipientChange = (event) => {
      setRecipientAddress(event.target.value);
    };
    
    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };
     
    const getMessages=async()=>{
      const web3 = new Web3(window.ethereum);
      
     const contractInstance = new web3.eth.Contract(cheercontractABI, cheercontractAddress);
      contractInstance.getPastEvents('newCheer', {
        // filter: { receiver:"0xd3ea63240bA6bB6c268141Eb0a3A56266b567852"  },
        fromBlock: 0,
        toBlock: 'latest',
  
      }, async (err, data) => {
        console.log(data);
      });
      }
    useEffect(() => {
      const web3 = new Web3(window.ethereum);
     
     const contractInstance = new web3.eth.Contract(cheercontractABI, cheercontractAddress);
      const newCheerEvent = contractInstance.events.newCheer();
      newCheerEvent.on('data', async(event) =>{
        console.log("blockchain updated");
         getMessages();
      });
      getMessages();
      
    }, [])
    
  
    const handleSendEth = async () => {
      console.log('Ether senting!');
     
      
      try {
       
        var postid="OmZzPLdva2jC9YBagiPr"
        var cheermsg="get rich"
        console.log(connectedAccount);
        const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(cheercontractABI, cheercontractAddress);
        await contractInstance.methods.sendEth(recipientAddress,postid,cheermsg).send({
          from: connectedAccount,
          value: web3.utils.toWei(amount, 'ether'),
        });
  
        // Transaction successful
        console.log('Ether sent successfully!');
      } catch (error) {
        console.error('Error sending Ether:', error);
      }
    };
  
    return (
      <div>
        <h1>Ether Transfer</h1>
        <label>Recipient Address:</label>
        <input type="text" value={recipientAddress} onChange={handleRecipientChange} />
        <label>Amount (in Ether):</label>
        <input type="text" value={amount} onChange={handleAmountChange} />
        <button onClick={handleSendEth}>Send Ether</button>

        <div class="cheers">

        </div>
      </div>
    );
  };
  

  




