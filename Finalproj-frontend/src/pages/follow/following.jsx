import {
    getFirestore, arrayRemove, doc,updateDoc, getDoc,onSnapshot
  } from 'firebase/firestore'; 
  import "./following.css"

import { useContext, useEffect,useState } from 'react';
import { testContext } from '../../context/testContext';


export default function Following(){
    const {connectedAccount}=useContext(testContext);
    const [friendsData, setFriendsData] = useState([[],[]]);
    const Unfollow=async(id)=>{
        const db = getFirestore();
        const ref = doc(db, "users", connectedAccount);
        await updateDoc(ref, {
            following: arrayRemove(id)
          });
          const frndref = doc(db, "users", id);
        await updateDoc(frndref, {
            followers: arrayRemove(connectedAccount)
          });
    }
    useEffect(() => {
        async function getFriends(){
           
           
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
            // const docSnap = await getDoc(docRef);
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                var friendNames=[];
                const friendsList=docSnap.data()['following'];
                for(var i=0;i<friendsList.length;i++){
                    const friendRef = doc(db, "users", friendsList[i]);
                  
                    const frienddocSnap = await getDoc(friendRef);
                    
                    const friendName=frienddocSnap.data()['name'];
                   
                    
                    friendNames.push(friendName);
                }
                  
                    setFriendsData([friendsList,friendNames]);
            });
           
                return () => {
                    unsubscribe();
                };
        }
        getFriends();
      
    }, [connectedAccount]);
    
    
    return(<div class="outer-following">
        <h4>Following</h4>
         {friendsData[0].map((frnd, index) => (
            <div className='followingItemOuter'>
                <div className="followingDetails">
                <div className="followingAddress">
                {frnd}
                </div>
                <div className="followingName">
                {friendsData[1][index]}
                </div>
                </div>
                
                <div className="unfollowBtn" onClick={(e)=>{Unfollow(frnd);}}>
                 Unfollow
                </div>
               
            </div>
        ))}

    </div>)
}