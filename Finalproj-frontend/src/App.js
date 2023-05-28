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

export default function App() {
  const {connectedAccount}=useContext(testContext);

  return (

    <div>
      {(connectedAccount===""||connectedAccount==null)? <Routes>
        <Route path="/" element={<LoginPage />} />
       </Routes>:<Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" exact element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/testChat" element={<TestChat />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>}
     


      


    </div>


  );
}


