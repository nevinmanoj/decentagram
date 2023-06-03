

import { useContext, useState } from 'react';

import { getEthereumContract } from "../../context/testContext"
import {
    getFirestore, doc,updateDoc,arrayUnion} from 'firebase/firestore'; 
import { testContext } from '../../context/testContext';
import './newFollow.css'


export default function NewFollow(){
    const [Addr, setAddr] = useState("");
    const[username,setusername]=useState("");
    const {connectedAccount}=useContext(testContext);
    const getUsername=async()=>{
        var contract =  getEthereumContract();
       var username = await contract.getUserName(Addr.toLowerCase().toString());
       return username;
    }

    const checkUserName=async()=>{
        if(Addr===""){
            alert("address cannot be empty")
        }
        else{
            const username=await getUsername();
        if(username===""||username==null){
            alert("Invalid address")
        }
        else{
            setusername(username);
        }
        }
    }

    const newFollow= async(e)=>{
        
        if(Addr===""){
            alert("Address cannot be empty")
        }
        else{
            const username=await getUsername();
            if(username===""||username==null){
                alert("Invalid Address");
            }
            else{
                const db = getFirestore();
                const frndref = doc(db, "users", Addr);
                await updateDoc(frndref, {
                    followers: arrayUnion(connectedAccount)
                  });
                  const myref = doc(db, "users", connectedAccount);
                await updateDoc(myref, {
                    following: arrayUnion(Addr)
                  });
            }
            
        }
        
    }

    return(<div class="outer">
        <h4>Add New Friends</h4>
        <div class="wrapper">
  <input type="text" placeholder='Enter address'  onChange={(e) => setAddr(e.target.value.toLowerCase())} />
             <div class="add-btns" onClick={newFollow}>
                Follow
            </div>
        </div>
        <div class="wrapper">
        <div class="add-btns" onClick={checkUserName}>
                Check User Name
            </div>
            {(username===""||username==null)?"":"username:"+username}
        </div>
           
        

    </div>);
}