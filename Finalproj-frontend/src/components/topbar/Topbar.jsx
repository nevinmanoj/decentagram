import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {
  getFirestore, collection, doc, setDoc
} from 'firebase/firestore';
import React from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../dropdown/dropdown";
import { getEthereumContract } from "../../context/testContext";


export default function Topbar() {

  const navigate = useNavigate();
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">BlockChain</span>
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
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem" onClick={() => { navigate('/testChat') }}>
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
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
