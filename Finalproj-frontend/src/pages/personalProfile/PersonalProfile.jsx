import "./PersonalProfile.css";
import React, { useContext, useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "./Sidebar-profile";
import Feed from "./Feed-profile";
import Rightbar from "./RightbarProfile";
import { testContext } from "../../context/testContext";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'



import { getFirestore, getDoc, doc,updateDoc } from 'firebase/firestore';

export default function Profile() {
    const projectId = '2QEO5EwQKOiXediYhXDbW2Q5dNn';
    const projectSecret = 'f0dca80af13ef4a49d052dbf919e5783';
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const ipfs = create({
      host: 'ipfs.infura.io:5001', port: 5001, protocol: 'https', headers: {
        authorization: auth
      },
      apiPath: "/api/v0"
    });
    const {connectedAccount }=  useContext(testContext);
    const [buffer, setbuffer] = useState(null);
    const [data, setdata] = useState([]);
    useEffect(() => {

        async function getData() {
          const db = getFirestore();
          const docRef = doc(db, "users", connectedAccount);
            const docSnap = await getDoc(docRef);
           
      
             setdata(docSnap.data());
             
    
        }
        getData();
        
    
      }, [connectedAccount])
      var inputRef=React.createRef();

      const captureFile = async(event) => {
      

        event.preventDefault()
        const file = event.target.files[0];
        
       
            try{
                const reader = new window.FileReader()
             reader.readAsArrayBuffer(file)
        
            reader.onloadend = () => {
        
              var x = Buffer(reader.result);
              
            //   setbuffer(x);
              const result = window.confirm('do you want to change profile picture to: '+file.name);
              if(result)
              uploadFile(x);
          
        
            
            
         }
            }catch(e){
                    console.log(e);
            }
            
        
         
      }

      const uploadFile= async(x)=>{
        console.log(x);
         const cid = await ipfs.add(x);
         console.log("uploaded to ipfs at:"+cid.path);
             const db = getFirestore();
             const ref = doc(db, "users", connectedAccount);
             await updateDoc(ref, {
                 profilepic:cid.path
               });
               console.log("updated in cloud at");   

      };
   
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="assets/post/3.jpeg"
                                alt=""
                            />
                            
                            <img onClick={()=>{inputRef.current.click();}}
                                className="profileUserImg"
                                src={data['profilepic']===""?"assets/pp.jpg":"https://ipfs.io/ipfs/"+data['profilepic']}
                                alt=""
                            />
                             <input  type="file" ref={inputRef}  style={{ display: 'none' }} onChange={captureFile} />
                            
                            
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{data['name']}</h4>
                            <span className="profileInfoDesc">{connectedAccount}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    );
}