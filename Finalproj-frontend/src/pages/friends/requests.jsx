import './requests.css'
import {
    getFirestore, arrayRemove, doc,updateDoc, getDoc,arrayUnion,onSnapshot} from 'firebase/firestore'; 

  import IconButton from '@mui/material/IconButton';
  import DeleteIcon from '@mui/icons-material/Delete';
  import DoneIcon from '@mui/icons-material/Done';
import { useContext, useEffect,useState } from 'react';
import { testContext } from '../../context/testContext';
export default function Requests(){
    const {connectedAccount}=useContext(testContext);
    const [RequestData, setRequestsData] = useState([[],[]]);
    const deleteRequest=async(id)=>{
        const db = getFirestore();
        const ref = doc(db, "users", connectedAccount);
      
      await updateDoc(ref, {
        requests: arrayRemove(id)
      });
      

    }

    const acceptRequest=async(id)=>{
        deleteRequest(id);
        const db = getFirestore();
        const ref = doc(db, "users", connectedAccount);
        await updateDoc(ref, {
            friends: arrayUnion(id)
          });
          const frndref = doc(db, "users", id);
        await updateDoc(frndref, {
            friends: arrayUnion(connectedAccount)
          });

    }

    useEffect(() => {
        async function getFriends() {
            var requestNames = [];
    
            const db = getFirestore();
            const docRef = doc(db, "users", connectedAccount);
    
            const unsubscribe = onSnapshot(docRef, async (docSnap) => {
                const requestsList = docSnap.data().requests;
    
                for (var i = 0; i < requestsList.length; i++) {
                    const requestRef = doc(db, "users", requestsList[i]);
                    const requestdocSnap = await getDoc(requestRef);
                    const requestName = requestdocSnap.data().name;
                    console.log(requestName);
                    requestNames.push(requestName);
                }
    
                setRequestsData([requestsList, requestNames]);
            });
    
            return () => {
                unsubscribe();
            };
        }
    
        getFriends();
    }, [connectedAccount]);
    

   

    // useEffect(() => {
    //     async function getFriends(){
    //         var requestNames=[];
           
    //         const db = getFirestore();
    //         const docRef = doc(db, "users", connectedAccount);
    //         const docSnap = await getDoc(docRef);
    //         const requestsList=docSnap.data()['requests'];
    //         for(var i=0;i<requestsList.length;i++){
    //             const requestRef = doc(db, "users", requestsList[i]);
              
    //             const requestdocSnap = await getDoc(requestRef);
                
    //             const requestName=requestdocSnap.data()['name'];
    //             console.log(requestName);
                
    //             requestNames.push(requestName);
    //         }
              
    //             setRequestsData([requestsList,requestNames]);
    //     }
    //     getFriends();
      
    // }, [connectedAccount]);

    return(<div class="outer-req">
    <h4>Requests</h4>
     {RequestData[0].map((frnd, index) => (
        <div class="req-item">
            <div class="req-details">
            {frnd}
            <br />
            {RequestData[1][index]}
             </div>  
             <IconButton >
             <DoneIcon onClick={(e)=>{acceptRequest(frnd);}}/> 
               </IconButton>
             <IconButton >
             <DeleteIcon onClick={(e)=>{deleteRequest(frnd);}}/>
               </IconButton>
             
            
        </div>
    ))}

</div>)
}