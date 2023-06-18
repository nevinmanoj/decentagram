import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useState, useEffect } from "react";

import { getFirestore, collection, orderBy,query,onSnapshot,doc } from 'firebase/firestore';
import { testContext } from "../../context/testContext";




export default function Feed() {

  const [data, setData] = useState([[], []]);

  const { connectedAccount } = useContext(testContext);
  const db = getFirestore();



useEffect(() => {
//   const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("dateTime", "desc")), (querySnapshot) => {
//     var keys = [];
//     var posts = [];

//     querySnapshot.forEach((doc) => {
//         keys.push(doc.id);
//         posts.push(doc.data());
//     });

//     setData([keys, posts]);
// });
const unsubscribe = onSnapshot(doc(db, "users", connectedAccount),(docSnap)=>{
  // var following=Object.values(docSnap.data()["following"]);
  onSnapshot(query(collection(db, "posts"), orderBy("dateTime", "desc")), (querySnapshot) => {
    var keys = [];
    var posts = [];
    var followText=[];
    querySnapshot.forEach((doc) => {
        keys.push(doc.id);
        posts.push(doc.data());
       
         if(doc.data()['author']===connectedAccount){
          followText.push("self");
         }
        
         else if(docSnap.data()["following"].includes(doc.data()['author'])){
          followText.push("Unfollow");
         }  
         else{
          followText.push("Follow");
         }
    });
   
    setData([keys, posts,followText]);
  });
});
    return () => {
        unsubscribe();
    };
}, []);
  // useEffect(() => {

  //   async function getData() {
  //     const db = getFirestore();
  //     // var username = await getUserName();
  //     // console.log(username);

  //     var keys = [];
  //     var posts = [];

  //     const querySnapshot = await getDocs(collection(db, "posts"));
  //     querySnapshot.forEach((doc) => {
  //       keys.push(doc.id);
  //       posts.push(doc.data());
  //       // console.log(doc.id, " => ", doc.data());
  //     });
  //     setData([keys, posts]);
      

  //   }
  //   getData();


  // }, [])






  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {data[0].map((id, index) => (
          <Post key={id} post={data[1][index]} id={id} followText={data[2][index]} />
        ))}


      </div>
    </div>
  );
}

