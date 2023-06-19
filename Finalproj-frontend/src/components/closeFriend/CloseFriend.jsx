import "./closeFriend.css";
import { useNavigate } from "react-router-dom";

export default function CloseFriend({ name, id }) {
  const navigate = useNavigate();
  return (
    <li className="sidebarFriend" onClick={()=>{ navigate('/testChat');}}>
      {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" /> */}
      <span className="sidebarFriendName">{name.split("@")[0].toUpperCase()}</span>
      <span className="sidebarAddress">{id}</span>
    </li>
  );
}
