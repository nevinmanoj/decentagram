import "./rightbar.css";
import { Users } from "../../dummyData";


import React from "react";
import { useNavigate } from "react-router-dom";



import CloseFriend from "../closeFriend/CloseFriend";

export default function Rightbar({ profile }) {


  const ProfileRightbar = () => {

    const navigate = useNavigate();

    function handleClick() {
      navigate('/chat');
    }

    return (
      <>


        <h2 onClick={handleClick} className="chat-heading">Chat</h2>


        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>

      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* {profile ? <ProfileRightbar /> : <HomeRightbar />} */}
        <ProfileRightbar />
      </div>
    </div>
  );
}
