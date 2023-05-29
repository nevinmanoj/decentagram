import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useState, useEffect } from "react";

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { testContext } from "../../context/testContext";




export default function Feed() {

  const [data, setData] = useState([[], []]);

  const { getUserName } = useContext(testContext);
  useEffect(() => {

    async function getData() {
      const db = getFirestore();
      // var username = await getUserName();
      // console.log(username);

      var keys = [];
      var posts = [];

      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        keys.push(doc.id);
        posts.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      setData([keys, posts]);

    }
    getData();


  }, [])






  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {data[0].map((id, index) => (
          <Post key={id} post={data[1][index]} id={id} />
        ))}


      </div>
    </div>
  );
}

