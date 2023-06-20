import "./sidebar.css";

import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          
        <li className="sidebarListItem"  onClick={() => { navigate('/follow');}}>
            <PeopleIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Followers & Following</span>
          </li>
          <li className="sidebarListItem"  onClick={() => { navigate('/login');}}>
            <LogoutIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Log Out</span>
          </li>

        </ul>
        
        
      </div>
    </div>
  );
}
