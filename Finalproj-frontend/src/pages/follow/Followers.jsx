import {
    getFirestore, arrayRemove, doc,updateDoc, getDoc,onSnapshot
  } from 'firebase/firestore'; 
import "./followers.css"
  import IconButton from '@mui/material/IconButton';
  import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect,useState } from 'react';
import { testContext } from '../../context/testContext';
import Tooltip from '@mui/material/Tooltip';
export default function Followers(){
    const {connectedAccount}=useContext(testContext);
    const [friendsData, setFriendsData] = useState([[],[]]);
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
    useEffect(() => {
        async function getFriends(){
           
           
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
            // const docSnap = await getDoc(docRef);
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                var friendNames=[];
                const friendsList=docSnap.data()['followers'];
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
    
    
    return(<div class="outer-followers">
        <h4>Followers</h4>
         {friendsData[0].map((frnd, index) => (
            <div>
                {frnd}--{friendsData[1][index]}
                <Tooltip title="Remove Follower" enterDelay={500} >
                <IconButton >
             <DeleteIcon onClick={(e)=>{deleteFollower(frnd);}}/>
               </IconButton>
               </Tooltip>
            </div>
        ))}

    </div>)
}