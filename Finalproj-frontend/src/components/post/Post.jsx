import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useState } from "react";
import { testContext } from "../../context/testContext";
import { getFirestore, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';

export default function Post({ post, id }) {
  const { connectedAccount } = useContext(testContext);
  const [like, setLike] = useState(post['like'].length)
  const [isLiked, setIsLiked] = useState(post['like'].includes(connectedAccount));

  const likeHandler = async () => {
    const db = getFirestore();
   
    const ref = doc(db, "posts", id);



    if (isLiked) {
      //unliking

      await updateDoc(ref, {
        like: arrayRemove(connectedAccount)
      });


    }
    else {
      // liking
      await updateDoc(ref, {
        like: arrayUnion(connectedAccount)
      });

    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }
  const [cheerVisible, setCheerVisible] = useState(false);

  const viewCheers = () => {
    setCheerVisible(!cheerVisible);
  };

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

            <span className="author-name">
              <br />
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
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            {isLiked ? <span className="postLikeCounter">You and {like - 1} people like it</span> : <span className="postLikeCounter">{like} people like it</span>}


          </div>
          <div className="postBottomRight" onClick={viewCheers}>
          <img src="assets/eth.png" alt=""  className="likeIcon"/>
            <span className="postCheerText">{"0.00105 Eth"} Cheered</span>
          </div>
          
        </div>
        <div className={`cheer-body ${cheerVisible ? 'visible' : 'hidden'}`}>
        <div class="new-cheer">
            <input type="text" />
            <div class="cheer-btn">Cheer <img src="assets/eth.png" alt=""  className="likeIcon"/></div>
         
        </div>
        <div class="cheers">
            <div class="cheer-item">
               nevin cheered 0.0023
            </div>
            <div class="cheer-item">
               guy cheered 0.1123
            </div>
            <div class="cheer-item">
               pranoy cheered 0.0055
            </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}
