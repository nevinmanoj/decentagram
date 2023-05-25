import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoUpload from "./sharetest";
import { useState,useContext } from "react";
import {  getFirestore, collection, doc, setDoc,addDoc} from 'firebase/firestore';
import { testContext } from "../../context/testContext";
import { create } from 'ipfs-http-client'

export default function Share() {
  const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    let {
      connectedAccount
    } =  useContext(testContext);


  const [details, setDetails] = useState("");
  const handleDetailChange = (event) => {
    setDetails(event.target.value);
  };
  const handleShare = async() => {
     const db = getFirestore();
    var date = new Date().toLocaleDateString("IN");
    var time = new Date().toLocaleTimeString("IN");


    
  var path= "users/"+connectedAccount+"/post";
  const docRef = await addDoc(collection(db, path), {
      details: details,
      media:"to be conti",
      date:date,
      time:time
  });

 
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            placeholder="What's on your mind ?"
            className="shareInput"
            onChange={handleDetailChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
            </div>


            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div> */}
            {/* <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div> */}
            <input type="file" onChange={handleFileChange} />
            {/* <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button className="shareButton" onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
}






 
