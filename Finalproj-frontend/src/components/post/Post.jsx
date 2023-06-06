import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useState,useEffect } from "react";
import { testContext } from "../../context/testContext";
import { getFirestore, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import { cheercontractAddress, cheercontractABI } from "./cheerConst";
import Web3 from 'web3';
import { getEthereumContract } from "../../context/testContext";


export default function Post({ post, id }) {
  const { connectedAccount } = useContext(testContext);
  const [like, setLike] = useState(post['like'].length)
  const [isLiked, setIsLiked] = useState(post['like'].includes(connectedAccount));
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [cheerData, setcheerData] = useState([[],[]]);

  const likeHandler = async () => {
    const db = getFirestore();
    const ref = doc(db, "posts", id);
    if (isLiked) { 
      await updateDoc(ref, {
        like: arrayRemove(connectedAccount)
      });
    }
    else {
        await updateDoc(ref, {
        like: arrayUnion(connectedAccount)
      });

    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  const handleNewCheer=async()=>{
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(cheercontractABI, cheercontractAddress);
    try {
      console.log("cheering for"+typeof(id));
      await contractInstance.methods.sendEth(post['author'],id,message).send({
        from: connectedAccount,
        value: web3.utils.toWei(amount, 'ether'),
      });
      console.log('Ether sent successfully!');
    } catch (error) {
      console.error('Error sending Ether:', error);
    }
   
  }

  const getCheerData=async()=>{
    const web3 = new Web3(window.ethereum);
    
   const contractInstance = new web3.eth.Contract(cheercontractABI, cheercontractAddress);
   var testcontract = await getEthereumContract();
    contractInstance.getPastEvents('newCheer', {
      filter: {receiver:post['author']},
      fromBlock: 0,
      toBlock: 'latest',

    }, async (err, data) => {
        var chdata=[];
        var names=[];
        for(var n=0;n<data.length;n++){
           if(data[n].returnValues.postid===id){
            var username = await testcontract.getUserName(data[n].returnValues.from.toString().toLowerCase());
            names.push(username);
            chdata.push(data[n].returnValues);
           }
        }
        setcheerData([chdata,names]);
    });
    }
  useEffect(() => {
    const web3 = new Web3(window.ethereum);
   
   const contractInstance = new web3.eth.Contract(cheercontractABI, cheercontractAddress);
    const newCheerEvent = contractInstance.events.newCheer();
    newCheerEvent.on('data', async(event) =>{
      console.log("blockchain updated");
       getCheerData();
    });
    getCheerData();
    
  }, [])
    


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
          <img src="assets/eth.png" alt=""  className="spin-out-image"/>
            <span className="postCheerText">{"0.00105 Eth"} Cheered</span>
          </div>
          
        </div>
        <div className={`cheer-body ${cheerVisible ? 'visible' : 'hidden'}`}>
        <div class="new-cheer">
            <input type="text" placeholder="ETH" onChange={(event) => {setAmount(event.target.value);}} />
            <input type="text" placeholder="message" onChange={(event) => {setMessage(event.target.value);}} />
            <div class="cheer-btn" onClick={handleNewCheer}>Cheer <img src="assets/eth.png" alt=""  className="likeIcon"/></div>
         
        </div>
        <div class="cheers">
           
           { cheerData[0].map((item, index) => (
          <div class="cheer-item">
          <div className="cheer-heading">
          {cheerData[1][index]} cheered {item.amount/ 10**18} Eth
          </div>
          <div className="cheer-message">
            {item.message}
          </div>
          </div>
        ))}
            
        </div>
        </div>
        
      </div>
    </div>
  );
}
