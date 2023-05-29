import "./sidebar-profile.css";
// 
import { Users } from "../../dummyData";
import CloseFriend from "./CloseFriend-profile";

import { useNavigate } from "react-router-dom";


export default function Sidebar() {

  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            {/* <RssFeed className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Blocked Accounts</span>
          </li>
          <li className="sidebarListItem">
            {/* <PlayCircleFilledOutlined className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Notifications</span>
          </li>
          <li className="sidebarListItem">
            {/* <Chat className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Privacy Policy</span>
          </li>

          <li className="sidebarListItem">
            {/* <Group className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Terms Of Service </span>
          </li>
          <li className="sidebarListItem">
            {/* <Bookmark className="sidebarIcon" /> */}
            <span className="sidebarListItemText">Community Guidelines</span>
          </li>
          <li className="sidebarListItem">
            {/* <HelpOutline className="sidebarIcon" /> */}
            <span className="sidebarListItemText" onClick={()=>{ navigate('/dev');}}>Support</span>
          </li>

        </ul>
        <button className="sidebarButton" onClick={() => { navigate('/login');}}>LogOut</button>
        <hr className="sidebarHr" />
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
