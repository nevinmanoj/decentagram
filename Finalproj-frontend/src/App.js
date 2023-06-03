// import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";

import Profile from "./pages/profile/Profile";

import Chat from "./pages/chat/chat";
import PersonalProfile from "./pages/personalProfile/PersonalProfile";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/register/Register";
import TestChat from "./pages/testChat/testChat";
import { testContext } from "./context/testContext";
import { useContext } from "react";
import Friends from "./pages/friends/friends";
import DevDash from "./pages/devDash/devFunction";
import Follow from "./pages/follow/follow"

export default function App() {
  const {connectedAccount}=useContext(testContext);

  return (

    <div>
      {(connectedAccount===""||connectedAccount==null)? <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
       </Routes>:<Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" exact element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/testChat" element={<TestChat />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/dev" element={<DevDash />} />
        <Route path="/follow" element={<Follow />} />
      </Routes>}
     


      


    </div>


  );
}


