import { useContext,useEffect,useState} from "react";
import "./rightbar-profile.css";
import {
  getFirestore, arrayRemove, doc,updateDoc, getDoc,onSnapshot
} from 'firebase/firestore'; 
import { testContext } from "../../context/testContext";
// import { Users } from "../../dummyData";
// import Online from "./onlineProfile";

// export default function Rightbar({ profile }) {
//   const HomeRightbar = () => {
//     return (
//       <>
//         <div className="birthdayContainer">
//           <img className="birthdayImg" src="assets/gift.png" alt="" />
//           <span className="birthdayText">
//             <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
//           </span>
//         </div>
//         <img className="rightbarAd" src="assets/ad.png" alt="" />
//         <h4 className="rightbarTitle">Online Friends</h4>
//         <ul className="rightbarFriendList">
//           {Users.map((u) => (
//             <Online key={u.id} user={u} />
//           ))}
//         </ul>
//       </>
//     );
//   };

  // const ProfileRightbar = () => {
    export default function Rightbar() {
      const {connectedAccount}=useContext(testContext);
      const [friendsData, setFriendsData] = useState([[],[]]);
      useEffect(() => {
        async function getFriends(){
            var friendNames=[];
            var friendpps=[];
           
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
            // const docSnap = await getDoc(docRef);
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                const friendsList=docSnap.data()['friends'];
                for(var i=0;i<friendsList.length;i++){
                    const friendRef = doc(db, "users", friendsList[i]);
                  
                    const frienddocSnap = await getDoc(friendRef);
                    
                    const friendName=frienddocSnap.data()['name'];
                    const pp=frienddocSnap.data()['profilepic'];
                    
                    
                    friendNames.push(friendName);
                    friendpps.push(pp);
                }
                  
                    setFriendsData([friendsList,friendNames,friendpps]);
            });
           
                return () => {
                    unsubscribe();
                };
        }
        getFriends();
      
    }, [connectedAccount]);

    return (
      <>
       <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          
        {friendsData[0].map((f,i)=>( <div className="rightbarFollowing">
            <img
              src={(friendsData[2][i]===""||friendsData[2][i]==null)?
              "assets/pp.jpg":
              "https://ipfs.io/ipfs/"+friendsData[2][i]}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{friendsData[1][i]}</span>
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
