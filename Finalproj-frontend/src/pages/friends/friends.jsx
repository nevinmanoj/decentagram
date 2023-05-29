import Topbar from "../../components/topbar/Topbar";
import CurFriends from "./curFriends";
import Requests from "./requests";
import './friends.css'
import AddFriend from "./addFriend";

export default function Friends(){


    return (<div class="main-outer">
        <Topbar />
       
        <AddFriend  />
        <div class="dash">
        
        <Requests class="dashItem" />
        <CurFriends class="dashItem"/>
       
        </div>
        
    </div>)
}