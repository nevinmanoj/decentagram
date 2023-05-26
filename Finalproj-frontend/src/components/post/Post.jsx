import "./post.css";
import { MoreVert } from "@material-ui/icons";

import { useContext, useState} from "react";
import { testContext } from "../../context/testContext";

import { getFirestore,updateDoc, arrayUnion, arrayRemove,doc} from 'firebase/firestore';

export default function Post({ post,id }) {
const {connectedAccount}=useContext(testContext);
   const [like, setLike] = useState(post['like'].length)
   const [isLiked, setIsLiked] = useState(post['like'].includes(connectedAccount));
     
  const likeHandler = async() => {
     const db = getFirestore();
     const ref = doc(db, "posts", id);


    
   if(isLiked){
    //unliking

    await updateDoc(ref, {
      like: arrayRemove(connectedAccount)
  });
  
  
   }
   else{
    // liking
    await updateDoc(ref, {
      like: arrayUnion(connectedAccount)
  });
 
   }
   setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            /> */}
            <span className="postUsername">
              {post['username'].split("@")[0]}

            </span>

            <span className="">

              {post['author']}
            </span>
            <span className="postDate">{post["date"]}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post['details']}</span>
          <img className="postImg" src={"https://ipfs.io/ipfs/" + post["ipfs"]} alt="Loading" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            {isLiked?<span className="postLikeCounter">You and {like-1} people like it</span>: <span className="postLikeCounter">{like} people like it</span>}
            
           
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{"post.comment"} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
// post['like'].includes(connectedAccount)