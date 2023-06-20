import {
    getFirestore, arrayRemove, doc,updateDoc, getDoc,onSnapshot,arrayUnion
  } from 'firebase/firestore'; 
import "./followers.css"
import { useContext, useEffect,useState } from 'react';
import { testContext } from '../../context/testContext';

export default function Followers(){
    const {connectedAccount}=useContext(testContext);
    const [friendsData, setFriendsData] = useState([[],[],[]]);
    const deleteFollower=async(id)=>{
        const db = getFirestore();
        const ref = doc(db, "users", connectedAccount);
        await updateDoc(ref, {
            followers: arrayRemove(id)
          });
          const frndref = doc(db, "users", id);
        await updateDoc(frndref, {
            following: arrayRemove(connectedAccount)
          });
    }



    const FollowBackOrUnfollow=async(text,follower)=>{
        const db = getFirestore();
        if(text==="Unfollow"){
            
            const ref = doc(db, "users", connectedAccount);
            await updateDoc(ref, {
                following: arrayRemove(follower)
              });
              const frndref = doc(db, "users", follower);
            await updateDoc(frndref, {
                followers: arrayRemove(connectedAccount)
              });
        }
        else{
            
            const frndref = doc(db, "users", follower);
            await updateDoc(frndref, {
                followers: arrayUnion(connectedAccount)
              });
              const myref = doc(db, "users", connectedAccount);
            await updateDoc(myref, {
                following: arrayUnion(follower)
              });
        }

    }
    useEffect(() => {
        async function getFriends(){
           
           
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
            // const docSnap = await getDoc(docRef);
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                var friendNames=[];
                var followText=[];
                const friendsList=docSnap.data()['followers'];
                for(var i=0;i<friendsList.length;i++){
                    const friendRef = doc(db, "users", friendsList[i]);
                  
                    const frienddocSnap = await getDoc(friendRef);
                    
                    const friendName=frienddocSnap.data()['name'];
                   
                    
                    friendNames.push(friendName);
                    if(docSnap.data()['following'].includes(friendsList[i])){
                        //following
                        followText.push("Unfollow");
                    }
                    else{
                        followText.push("Follow Back");
                    }
                }
                  
                    setFriendsData([friendsList,friendNames,followText]);
            });
           
                return () => {
                    unsubscribe();
                };
        }
        getFriends();
      
    }, [connectedAccount]);
    
    
    return(<div className='scrollablefollower-container'>

    <div class="outer-followers">
            <h4 className='followers-text'>Followers</h4>
             {friendsData[0].map((frnd, index) => (
                <div className='followersItemOuter'>
                    <div className="followersDetails">
                    
                    <div className="followerName">
                    {friendsData[1][index]}
                    </div>
                    <div className="followerAddress">
                    {frnd}
                    </div>
                    </div>
                    
                    <div className="deleteBtn" onClick={(e)=>{deleteFollower(frnd);}}>
                     Delete
                    </div>
                    {friendsData[2][index]==='Unfollow'?<div className="Unfollow-button" onClick={(e)=>{FollowBackOrUnfollow(friendsData[2][index],frnd)}}>
                    {friendsData[2][index]}
                    </div>:<div className="follow-back-button" onClick={(e)=>{FollowBackOrUnfollow(friendsData[2][index],frnd)}}>
                    {friendsData[2][index]}
                    </div>}
                   
                </div>
            ))}
    
        </div>
    
            </div>
    
    
    
    
    
    
   )
}