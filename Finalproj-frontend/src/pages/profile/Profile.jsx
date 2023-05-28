import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext } from "react";
import { testContext } from "../../context/testContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
   const navigate = useNavigate();
   const {connectedAccount}=useContext(testContext);
   console.log(connectedAccount);
   if(connectedAccount===""||connectedAccount===null){

     navigate('/login');
   }
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">

          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
