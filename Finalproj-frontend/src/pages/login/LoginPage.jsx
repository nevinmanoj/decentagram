/* eslint-disable no-unused-vars */
import React, { useState, useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import SocialNetwork from '../../img/SocialNetwork.png';
import { testContext } from "../../context/testContext";
import AuthValidation from "../../utils/AuthValidation";
function LoginPage() {

  const navigate = useNavigate();

  
  const {
    connectWallet,
    connectedAccount,
    loginData,
    handleLoginDataChange,
    getUserAddress,
    isLoggedIn,
    setisLoggedIn,
    setloginData,
    getUserName,
    curUserName,
  } =  useContext(testContext);
 
  useEffect(() => {
    const handleAccountsChanged = () => {
      // Reload the page when MetaMask account is changed
      window.location.reload();
    };

    // Add event listener for MetaMask account change
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // Clean up the event listener on component unmount
    // return () => {
    //   window.ethereum.off('accountsChanged', handleAccountsChanged);
    // };
  }, []);
  const handleLoginFormSubmit = async(event) => {
    const {username,password}=loginData;
     event.preventDefault();
     if(!username){alert("Enter email");return;}
     if(!password){alert("Enter password");return;}
     !connectedAccount&&connectWallet();
     let userAddress=getUserAddress();
     if (userAddress === '0x0000000000000000000000000000000000000000') {
      alert("account does not exists");
      return;
     }
     let validated = await AuthValidation(username,connectedAccount,password);
     setisLoggedIn(validated);
    
    console.log("validated:", validated);
    console.log("Username:", username);
    console.log("islogedin:", isLoggedIn);
    if(validated){
      setloginData({username:"",password:""});
      getUserName();
    console.log("current username:"+curUserName);
      navigate('/');

    }
    else{
      alert("wrong credentials");
    }

    // navigate('/');
  };

  return (<div className="login-row"><div className="vector-art">
    <img className="cover-image" src={SocialNetwork} alt="" /> </div> <div className="login-form">


      <form onSubmit={handleLoginFormSubmit}>
        <div className="username-box">
          {/* <label htmlFor="username">Username:</label> */}
          <input
            placeholder="Username/Email"
            type="text"
            className="username"
            // value={username}
            onChange={(e) => handleLoginDataChange(e, "username")}
          />
        </div>
        <div className="password-box">
          {/* <label htmlFor="password">Password:</label> */}
          <input
            placeholder="Password"
            type="password"
            className="password"
            // value={password}
            onChange={(e) => handleLoginDataChange(e, "password")}
          />
        </div>
        <div className="Sign-In-Button-div"><button type="submit" className="Sign-In-Button" >Sign In</button></div>
        <div className="toSignup">Do not have an  Account?  <div onClick={() => { navigate('/register') }}><span className="log-in-text">Sign Up</span></div></div>
      </form>
    </div>

  </div>

  );
}
export default LoginPage;
