// import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";

import Profile from "./pages/profile/Profile";
import NewChat from "./pages/chat/newChat";
import Chat from "./pages/chat/chat";
import PersonalProfile from "./pages/personalProfile/PersonalProfile";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/register/Register";
import TestChat from "./pages/testChat/testChat";


export default function App() {
  return (

    <div>


      <Routes>
        <Route path="/" exact element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/chat" element={<NewChat />} /> */}
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/testChat" element={<TestChat />} />
      </Routes>


    </div>


  );
}


