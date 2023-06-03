import "./topbar.css";
import {  Person, Chat, Notifications } from "@material-ui/icons";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import { testContext } from "../../context/testContext";
import {
  getFirestore, doc,updateDoc, getDoc,onSnapshot
} from 'firebase/firestore'; 

export default function Topbar() {
const {connectedAccount}=useContext(testContext);
const [reqCount, setreqCount] = useState(0);
useEffect(() => {
  
  async function getData(){
    const db = getFirestore();
    const docRef = doc(db, "users", connectedAccount);
    
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
     
        setreqCount(docSnap.data()['requests'].length);
      });
        
    
  
 
      return () => {
          unsubscribe();
      };
  }
  getData();
  
}, [connectedAccount]);
  const navigate = useNavigate();
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Decentagram</span>
      </div>
      <div className="topbarCenter">
        {/* <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={() => { navigate('/') }}>Home</span>
          <span className="topbarLink" onClick={() => { navigate('/profile') }}>Profile</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem"  onClick={() => { navigate('/friends') }}>
            <Person />
          {reqCount>0?  <span className="topbarIconBadge">{reqCount}</span>:""}
          </div>
          <div className="topbarIconItem" onClick={() => { navigate('/testChat') }}>
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem" onClick={() => { navigate('/follow') }} >
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {/* <img src="/assets/person/1.jpeg" alt="" className="topbarImg" onClick={() => { <DropDown /> }} />
        <DropDown /> */}

      </div>
    </div>
  );
}
