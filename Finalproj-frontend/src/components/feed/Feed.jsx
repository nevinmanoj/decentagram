import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useState, useEffect } from "react";

import { getFirestore, collection, orderBy,query,onSnapshot,doc,where } from 'firebase/firestore';
import { testContext } from "../../context/testContext";




export default function Feed() {

  const [data, setData] = useState([[], []]);
  const [isPublicFeed, setisPublicFeed] = useState(true);
  const { connectedAccount } = useContext(testContext);
 

  const changeFeed=()=>{
    setisPublicFeed(!isPublicFeed);
  }


useEffect(() => {
  const db = getFirestore();
const unsubscribe = onSnapshot(doc(db, "users", connectedAccount),(docSnap)=>{
 
  var postquery=isPublicFeed?
  query(collection(db, "posts"), orderBy("dateTime", "desc"))
  :query(collection(db, "posts"), orderBy("dateTime", "desc"),where("author", "in", docSnap.data()["following"]),)
  onSnapshot(postquery, (querySnapshot) => {
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
}, [isPublicFeed,connectedAccount]);







  return (
    <div className="feed">
      <div className="feedWrapper">
        <div className="header">
          <div className="headerItem1" onClick={changeFeed}>
          <div className={isPublicFeed?"selected":"notSelected"}>
            Public  
            </div>
            
          </div>
          <div className="headerItem2" onClick={changeFeed}>
          <div className={!isPublicFeed?"selected":"notSelected"}>
          Following  
            </div>
            
          </div>
        </div>
        <Share />
        {data[0].map((id, index) => (
          <Post key={id} post={data[1][index]} id={id} followText={data[2][index]} />
        ))}


      </div>
    </div>
  );
}

