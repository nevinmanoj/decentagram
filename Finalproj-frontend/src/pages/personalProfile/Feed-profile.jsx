import Post from "./Post-profile";
import Share from "./ShareProfile";
import "./feed-profile.css";
import { Posts } from "../../dummyData";
import { getFirestore, collection, doc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { useContext, useState, useEffect } from "react";
import { testContext } from "../../context/testContext";

export default function Feed() {

  const [data, setData] = useState([[], []]);

  const { getUserName } = useContext(testContext);

  useEffect(() => {

    async function getData() {
      const db = getFirestore();


      var keys = [];
      var posts = [];

      const querySnapshot = await getDocs(collection(db, "posts"));
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
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}


      </div>
    </div>
  );
}
