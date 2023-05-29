import {
    getFirestore, arrayRemove, doc,updateDoc, getDoc
  } from 'firebase/firestore'; 
  import "./curFriends.css";
  import IconButton from '@mui/material/IconButton';
  import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect,useState } from 'react';
import { testContext } from '../../context/testContext';

export default function CurFriends(){
    const {connectedAccount}=useContext(testContext);
    const [friendsData, setFriendsData] = useState([[],[]]);
    const deleteFriend=async(id)=>{
        const db = getFirestore();
        const ref = doc(db, "users", connectedAccount);
        await updateDoc(ref, {
            friends: arrayRemove(id)
          });
          const frndref = doc(db, "users", id);
        await updateDoc(frndref, {
            friends: arrayRemove(connectedAccount)
          });
    }
    useEffect(() => {
        async function getFriends(){
            var friendNames=[];
           
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
            const docSnap = await getDoc(docRef);
            const friendsList=docSnap.data()['friends'];
            for(var i=0;i<friendsList.length;i++){
                const friendRef = doc(db, "users", friendsList[i]);
              
                const frienddocSnap = await getDoc(friendRef);
                
                const friendName=frienddocSnap.data()['name'];
                console.log(friendName);
                
                friendNames.push(friendName);
            }
              
                setFriendsData([friendsList,friendNames]);
        }
        getFriends();
      
    }, [connectedAccount]);
    
    
    return(<div class="outer-cur">
        <h4>Friends</h4>
         {friendsData[0].map((frnd, index) => (
            <div>
                {frnd}--{friendsData[1][index]}

                <IconButton >
             <DeleteIcon onClick={(e)=>{deleteFriend(frnd);}}/>
               </IconButton>
            </div>
        ))}

    </div>)
}