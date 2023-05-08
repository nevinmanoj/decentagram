import "./PersonalProfile.css";
import React, { useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "./Sidebar-profile";
import Feed from "./Feed-profile";
import Rightbar from "./RightbarProfile";
import { testContext } from "../../context/testContext";

export default function Profile() {
    const {connectedAccount,curUserName }=  useContext(testContext);
   
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="assets/post/3.jpeg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src="/assets/person/1.jpeg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{curUserName}</h4>
                            <span className="profileInfoDesc">{connectedAccount}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
}