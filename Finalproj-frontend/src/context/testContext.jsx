/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
    getFirestore, collection, doc, setDoc,getDocs,where,query
} from 'firebase/firestore';
import { contractABI, contractAddress } from '../utils/constants';
import AuthenticationHash from '../utils/authenticateHash';
import web3Connection from '../web3Connection';


export const testContext = React.createContext();
const { ethereum } = window;


export const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const testContract = new ethers.Contract(contractAddress, contractABI, signer);


    return testContract;
}

export const TestProvider = ({ children }) => {
    const [connectedAccount, setconnectedAccount] = useState("");
    const [formData, setFormData] = useState({ name: "", username: "", password: "" });
    const [isLoading, setisLoading] = useState(false);
    const [loginData, setloginData] = useState({ username: "", password: "" });
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [curUserName, setcurUserName] = useState("");
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));

        // console.log(formData);
    }

    const handleLoginDataChange = (e, name) => {
        setloginData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const checkIfWalletConnected = async () => {
        if (!ethereum) return alert("pls install metamask");
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
            setconnectedAccount(accounts[0]);
        }

        console.log("connected account :" + accounts);

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("pls install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setconnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            // throw new error("no eth object");
        }
    }
    const getUserAddress = async () => {
        try {
            if (!ethereum) return alert("pls install metamask");

            const testContract = getEthereumContract();

            const userAddress = await testContract.getUserAddress();
            return userAddress;

        } catch (error) {
            console.log(error);
            // throw new error("no eth object");
        }
    }

    const getUserName = async () => {
        try {
            if (!ethereum) return alert("pls install metamask");

            const testContract = await getEthereumContract();



            const userName = await testContract.getUserName(connectedAccount);
            setcurUserName(userName);
            return userName;

        } catch (error) {
            console.log(error);
            // throw new error("no eth object");
        }
    }

    const createUser = async () => {
        try {
            if (!ethereum) return alert("pls install metamask");
            const { name, username, password } = formData;
            const testContract = getEthereumContract();

            const web3 = await web3Connection();
            const sign = await AuthenticationHash(username, connectedAccount, password, web3);
            console.log("sign:" + sign);
            
            
            const db = getFirestore();
             const q = query(collection(db, "users"), where("email", "==", username));

             const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                
            const userAdr = await testContract.getUserAddress();
            console.log("userAdr:" + userAdr);
            const testHash = await testContract.regUser(username, sign);
            setisLoading(true);
            console.log("loading- " + testHash.hash);
            await testHash.wait();
            setisLoading(false);
            console.log('Success-' + testHash.hash);

            const userCount = await testContract.getUserCount();
            console.log("userCount:" + userCount);
            

            // collection ref
            const colRef = collection(db, 'users');
            const docData = {
                email: username,
                name: name,
                address: connectedAccount,
                profilepic:"",
                requests:[],
                friends:[]

            };
            await setDoc(doc(db, "users", connectedAccount), docData);

            }
            else{
                alert("username/email already taken");
            }
            

            // setuserCount(userCount.toNumber);
        } catch (error) {
            console.log(error);
            // throw new error("no eth object");
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);
    return (<testContext.Provider value={
        {
            connectWallet,
            connectedAccount,
            formData,
            handleChange,
            createUser,
            loginData,
            handleLoginDataChange,
            getUserAddress,
            setisLoggedIn,
            isLoggedIn,
            setloginData,
            curUserName,
            getUserName,
            setconnectedAccount,

        }}>
        {children}
    </testContext.Provider>);
}