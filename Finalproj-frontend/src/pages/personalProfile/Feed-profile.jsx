// import Post from "./Post-profile";
import Post from '../../components/post/Post'
// import Share from "./ShareProfile";
import "./feed-profile.css";
import { Posts } from "../../dummyData";
import Share from '../../components/share/Share'

import { useContext, useState, useEffect } from "react";

import { getFirestore, collection, getDocs, query, where  } from 'firebase/firestore';
import { testContext } from "../../context/testContext";

export default function Feed() {

  
  const [data, setData] = useState([[], []]);

  const { getUserName,connectedAccount } = useContext(testContext);
  useEffect( () => {
    
     async function getData(){
      const db = getFirestore();
      // var username = await getUserName();
      // console.log(username);

 const ref = collection(db, "posts");

// Create a query against the collection.
const q = query(ref, where("author", "==", connectedAccount));
  
      var keys = [];
      var posts = [];
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        keys.push(doc.id);
        posts.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      setData([keys, posts]);
  
     }
     getData();
   

  }, [])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {data[0].map((p,i) => (
          <Post key={data[0][i]} post={data[1][i]} />
        ))}
      </div>
    </div>
  );
}
