import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PhotoUpload from "./sharetest";
import { useState, useContext } from "react";
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { testContext } from "../../context/testContext";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

export default function Share() {
  const projectId = '2QEO5EwQKOiXediYhXDbW2Q5dNn';
  const projectSecret = 'f0dca80af13ef4a49d052dbf919e5783';
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  const ipfs = create({
    host: 'ipfs.infura.io:5001', port: 5001, protocol: 'https', headers: {
      authorization: auth
    },
    apiPath: "/api/v0"
  });
  // const [selectedFile, setSelectedFile] = useState(null);
  const [buffer, setbuffer] = useState(null);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  let {
    connectedAccount, getUserName
  } = useContext(testContext);


  const [details, setDetails] = useState("");
  const handleDetailChange = (event) => {
    setDetails(event.target.value);
  };
  const handleShare = async () => {
    // handleShareFirebase();
    handleShareIpfs();
  }
  const captureFile = (event) => {

    event.preventDefault()
    const file = event.target.files[0]

    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {

      var x = Buffer(reader.result);
      setbuffer(x);


    }
  }

  const handleShareFirebase = async (cid) => {



    const db = getFirestore();
    var date = new Date().toLocaleDateString("IN");
    var time = new Date().toLocaleTimeString("IN");
    var path = "users/" + connectedAccount + "/post";
    var name = await getUserName();
    
    const docRef = await addDoc(collection(db, path), {
      details: details,
      ipfs: cid.path,
      date: date,
      time: time,
      username: name,
      author: connectedAccount,
      like:[]
    });


  };
 
  const addToPostDb = async (cid) => {
    const db = getFirestore();
    var date = new Date().toLocaleDateString("IN");
    var time = new Date().toLocaleTimeString("IN");
    var name = await getUserName();
    const docRef = await addDoc(collection(db, "posts"), {
      details: details,
      ipfs: cid.path,
      date: date,
      time: time,
      author: connectedAccount,
      username: name,
      like:[],
    });
  };

  const handleShareIpfs = async () => {
    var name = await getUserName();
    if(name==null||connectedAccount==null){
      alert("pls login again");
      return
    }

    if (buffer != null) {
      try {
        console.log("Submitting file to ipfs...");
        const cid = await ipfs.add(buffer);
        console.log(cid);
        // handleShareFirebase(cid);
        addToPostDb(cid);

      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      alert("choose file");
    }


  }

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
            <input type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={captureFile} />
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







