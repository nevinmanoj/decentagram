
import './dev.css'
import React, { useState,useEffect,useContext} from 'react';
// import TransferContract from './TransferContract.json';
import Web3 from 'web3';
// import {
//     getFirestore, collection, doc,updateDoc, getDocs
//   } from 'firebase/firestore'; 
import Topbar from '../../components/topbar/Topbar';
import { TransfercontractABI,TransfercontractAddress } from "./trasnferConst";
 import { cheercontractAddress, cheercontractABI } from "./cheerConst";

 import {testContext} from '../../context/testContext';
 import { ethers } from 'ethers';
const { ethereum } = window;
async function addArrayToDocuments(e)  {
  console.log("uncomment and write code ");
    try {
        //  const db = getFirestore();
        
      //  const querySnapshot = await getDocs(collection(db, "posts"));
      //  querySnapshot.forEach(async(cdoc) => {
      //    const ref = doc(db, "posts",cdoc.id);
      //   const date=cdoc.data().date.split("/");
      //   const time=cdoc.data().time.split(".");
      //   const dateTime=date[2]+"0"+date[1]+date[0]+time[0]+time[1]+time[2]
      //   console.log(dateTime);
      //  await updateDoc(ref, {
      //    dateTime: dateTime
      //  });
      //  });
      
  
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
        <Trasnfer />
        <TransferEth />
        <SendEth />
        <NewTransfer />
    </div>)
  }




const Trasnfer = () => {
   const {connectedAccount}=useContext(testContext);
   const [Balance, setbalance] = useState("");

   const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const cheerContract = new ethers.Contract(cheercontractAddress, cheercontractABI, signer);

  



   useEffect(() => {
      async function getBalance(){
        const balance = await ethereum.request({
          method: 'eth_getBalance',
          params: [connectedAccount, 'latest'],
        });
        const web3 = new Web3(window.ethereum);
        const etherBalance = web3.utils.fromWei(balance, 'ether');
        setbalance(etherBalance);
      }
   
     getBalance();
   }, [])
   
  
 
  const [toAddress, setToAddress] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const sendCheer=async()=>{
    try {
      const parsedAmount=ethers.utils.parseEther(amount);
      await ethereum.request({
        method:'eth_sendTransaction',
        params:[{
          from:connectedAccount,
          to:toAddress,
          gas:'0x186a0',
          value:parsedAmount._hex,
        }]
      });
      //  await cheerContract.

    } catch (error) {
      console.log(error);
    }
  }
  const handleTransfer = async () => {
    try {
      const web3 = new Web3(window.ethereum);
     
     

     
      
      // Transfer successful
      console.log('Transfer successful');
    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  };

  return (
    <div>
      <h1>Transfer Funds</h1>
      <form>
        <label htmlFor="fromAddress">From Address:</label>
        {connectedAccount}
        <br />
        <label htmlFor="fromAddress">Balance: </label>
        {Balance} Eth
        <br />
        <label htmlFor="toAddress">To Address:</label>
        <input
          type="text"
          id="toAddress"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <br />
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button type="button" onClick={sendCheer}>
          Transfer
        </button>
      </form>
    </div>
  );
};




const TransferEth = () => {
  // const [web3, setWeb3] = useState(null);
  // const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    
    
    let web3 = new Web3(window.ethereum)
    let Transfercontract = new web3.eth.Contract(TransfercontractABI,TransfercontractAddress);

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const contractBalance = await web3.eth.getBalance(Transfercontract.options.address);
    setBalance(web3.utils.fromWei(contractBalance, 'ether'));
  };

  const handleTransfer = async () => {
    let web3 = new Web3(window.ethereum)
    let Transfercontract = new web3.eth.Contract(TransfercontractABI,TransfercontractAddress);
      await Transfercontract.methods.transfer(recipient).send({ from: account });
      const contractBalance = await web3.eth.getBalance(Transfercontract.options.address);
      setBalance(web3.utils.fromWei(contractBalance, 'ether'));
    
  };

  return (
    <div>
      <h1>Ethereum Transfer</h1>
      <p>Account: {account}</p>
      <p>Contract Balance: {balance} ETH</p>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};





//********************************SEND TO CONTRACT********************/


const SendEth = () => {
 
  const [account, setAccount] = useState('');
  // const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        
        loadBlockchainData();
      }
    };
    loadWeb3();
  }, []);

  const loadBlockchainData = async () => {
    let web3 = new Web3(window.ethereum)
    let Transfercontract = new web3.eth.Contract(TransfercontractABI,TransfercontractAddress);
  
    

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const contractBalance = await web3.eth.getBalance(Transfercontract.options.address);
    setBalance(web3.utils.fromWei(contractBalance, 'ether'));
  };

  const handleTransfer = async () => {
    let web3 = new Web3(window.ethereum)
    let Transfercontract = new web3.eth.Contract(TransfercontractABI,TransfercontractAddress);
      const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
      await Transfercontract.methods.receive().send({ from: account, value: weiAmount });
      // await Transfercontract.methods.receive().send({ from: account, value: weiAmount });
      const contractBalance = await web3.eth.getBalance(Transfercontract.options.address);
      setBalance(contractBalance);
    
  };

  return (
    <div>
      <h1>Ethereum Send</h1>
      <p>Account: {account}</p>
      <p>Contract Balance: {balance} ETH</p>
      {/* <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      /> */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to Send (ETH)"
      />
      <button onClick={handleTransfer}>Transfer to Contract</button>
    </div>
  );
};


//*******************************NEW FUCNTION */

const NewTransfer = () => {
 
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [message, setmessage] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        
        loadBlockchainData();
      }
    };
    loadWeb3();
  }, []);

  const loadBlockchainData = async () => {
    let web3 = new Web3(window.ethereum)
    let Transfercontract = new web3.eth.Contract(TransfercontractABI,TransfercontractAddress);
  
    

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const contractBalance = await web3.eth.getBalance(Transfercontract.options.address);
    setBalance(web3.utils.fromWei(contractBalance, 'ether'));
  };

  const handleTransfer = async () => {
    let web3 = new Web3(window.ethereum)
    let Transfercontract = new web3.eth.Contract(TransfercontractABI,TransfercontractAddress);
      const weiAmount = web3.utils.toWei(amount.toString(), 'ether');

      await Transfercontract.methods.transferNew(recipient,weiAmount,message).send({ from: account, value: weiAmount });
      const contractBalance = await web3.eth.getBalance(Transfercontract.options.address);
      setBalance(contractBalance);
    
  };

  return (
    <div>
      <h1>New cheers</h1>
      <p>Account: {account}</p>
      <p>Contract Balance: {balance} ETH</p>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
      />
       <input
        type="text"
        value={message}
        onChange={(e) => setmessage(e.target.value)}
        placeholder="message"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to Send (ETH)"
      />
      <button onClick={handleTransfer}>Transfer to Contract</button>
    </div>
  );
};




