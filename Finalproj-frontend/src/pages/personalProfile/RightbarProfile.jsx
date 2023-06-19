import { useContext,useEffect,useState} from "react";
import "./rightbar-profile.css";
import {
  getFirestore, arrayRemove, doc,updateDoc, getDoc,onSnapshot
} from 'firebase/firestore'; 
import { testContext } from "../../context/testContext";

    export default function Rightbar() {
      const {connectedAccount}=useContext(testContext);
      const [followingsData, setFollowingsData] = useState([[],[],[]]);
      const [followersData, setfollowersData] = useState(0);
      const [email, setemail] = useState("");
      useEffect(() => {
        async function getFollowings(){
            var followingNames=[];
            var followingpps=[];
           
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
            // const docSnap = await getDoc(docRef);
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                const followingsList=docSnap.data()['following'];
                for(var i=0;i<followingsList.length;i++){
                    const followingRef = doc(db, "users", followingsList[i]);
                  
                    const followingdocSnap = await getDoc(followingRef);
                    
                    const followingName=followingdocSnap.data()['name'];
                    const pp=followingdocSnap.data()['profilepic'];
                    
                    
                    followingNames.push(followingName);
                    followingpps.push(pp);
                }
                    setemail(docSnap.data()['email'])
                    setFollowingsData([followingsList,followingNames,followingpps]);
                    setfollowersData(docSnap.data()['followers'].length)
            });
           
                return () => {
                    unsubscribe();
                };
        }
        getFollowings();
      
    }, [connectedAccount]);

    return (
      <>
       <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{email}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Followers:</span>
            <span className="rightbarInfoValue">{followersData}</span>
          </div>
          
          
        </div>
        <h4 className="rightbarTitle">Following ({followingsData[0].length})</h4>
        <div className="rightbarFollowings">
          
        {followingsData[0].map((f,i)=>( <div className="rightbarFollowing">
            <img
              src={(followingsData[2][i]===""||followingsData[2][i]==null)?
              "assets/pp.jpg":
              "https://ipfs.io/ipfs/"+followingsData[2][i]}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{followingsData[1][i]}</span>
          </div>))}



          
        </div>
        </div>
    </div>
      </>
    );
  };
//   return (
//     <div className="rightbar">
//       <div className="rightbarWrapper">
//         {profile ? <ProfileRightbar /> : <HomeRightbar />}
//       </div>
//     </div>
//   );
// }
