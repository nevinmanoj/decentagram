
import './dev.css'

import {
    getFirestore, collection, doc,updateDoc, getDocs
  } from 'firebase/firestore'; 
import Topbar from '../../components/topbar/Topbar';
async function addArrayToDocuments(e)  {
  console.log("uncomment and write code ");
    try {
         const db = getFirestore();
        
      //  const querySnapshot = await getDocs(collection(db, "posts"));
      //  querySnapshot.forEach(async(cdoc) => {
      //    const ref = doc(db, "posts",cdoc.id);
      //   const date=cdoc.data().date.split("/");
      //   const time=cdoc.data().time.split(".");
      //   const dateTime=date[2]+"0"+date[1]+date[0]+time[0]+time[1]+time[2]
      //   console.log(dateTime);
      //  await updateDoc(ref, {
      //    dateTime: dateTime
      //  });
      //  });
      
  
       console.log('data added to all documents successfully.');
    } catch (error) {
      console.error('Error adding array to documents:', error);
    }
  }

  

 
  export default function DevDash(){
   
    return(<div>
        <Topbar/>
        <h2>DevDash</h2>
        <div class="btn"  onClick={addArrayToDocuments}>Add</div>
    </div>)
  }