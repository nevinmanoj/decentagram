/* eslint-disable no-unused-vars */
// import { blue } from "@material-ui/core/colors";
import React, { useState,useContext } from "react";


import { useNavigate } from "react-router-dom";
import SocialNetwork from '../../img/SocialNetwork.png';

import "./register.css"
import { testContext } from "../../context/testContext";
function SignupPage() {
  
  const navigate = useNavigate();
  const {connectWallet,connectedAccount,formData,handleChange,createUser}=  useContext(testContext);


  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };
  // const handleNameChange = (event) => {
  //   setName(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  const handleLoginFormSubmit = (event) => {
    const {name,username,password}=formData;
    event.preventDefault();
   if(!name){alert("Enter name");return;}
   if(!username){alert("Enter email");return;}
   if(!password){alert("Enter password");return;}
   !connectedAccount&&connectWallet();
    createUser();
    
    // navigate('/');
    
  };

  return (<div className="login-row"><div className="vector-art">
    <img className="cover-image" src={SocialNetwork} alt="" /></div> <div className="login-form">


      <form onSubmit={handleLoginFormSubmit}>
        <div className="name-box">
          {/* <label htmlFor="username">Username:</label> */}
          <input
            placeholder="Name"
            type="text"
            className="name"
            // value={name}
            onChange={(e) => handleChange(e, "name")}
            
          />
        </div>
        <div className="username-box">
          {/* <label htmlFor="username">Username:</label> */}
          <input
            placeholder="Email"
            type="text"
            className="username"
            // value={username}
            onChange={(e) => handleChange(e, "username")}
          />
        </div>
        <div className="password-box">
          {/* <label htmlFor="password">Password:</label> */}
          <input
            placeholder="Password"
            type="password"
            className="password"
            // value={password}
            onChange={(e) => handleChange(e, "password")}
          />

        </div>
        
        <div className="Sign-In-Button-div"><button type="submit" className="Sign-In-Button" >Sign Up</button></div>
        <div className="toSignup" >Already have an Account?  <div onClick={() => { navigate('/login') }}><span className="log-in-text">Log In</span></div></div>
      </form>
    </div >

  </div >

  );
}
export default SignupPage;