import "./closeFriend.css";


export default function CloseFriend({ name, id }) {

  return (
    <li className="sidebarFriend">
      {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" /> */}
      <span className="sidebarFriendName">{name.split("@")[0].toUpperCase()}</span>
      <span className="sidebarAddress">{id}</span>
    </li>
  );
}
