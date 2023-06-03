
import Topbar from "../../components/topbar/Topbar"
import './follow.css'
import Followers from "./Followers"
import Following from "./following"
import NewFollow from "./newFollow"
export default function Follow(){


    return (<div class="main-outer">
        <Topbar />
       
        <NewFollow />
        <div class="dash">
        
        {/* <Requests class="dashItem" />
        <CurFriends class="dashItem"/> */}
        <Followers />
        <Following />
       
        </div>
        
    </div>)
}