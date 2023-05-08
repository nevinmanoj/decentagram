import "./chat.css";
import Topbar from "../../components/topbar/Topbar";


import React, { useState } from "react";

export default function Chat() {
    const [items, setItems] = useState([
        {
            'data': 'Hey',
            'timestamp': 1679515500846,
            "username": "Oliver Khan",
            'id': 1
        }
      
    ]);

    const handleAddItem = () => {
        var x = document.getElementById("inp").value;
        var date = Date.now();
        setItems([...items, {
            'data': x,
            'timestamp': date,
            "username": "Neha James",
            'id': 2
        }]);
    };

    return (

        <div>
            <Topbar />

            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item['username']}  :<span className="chatBubble">{item['data']}</span> </li>
                ))}
            </ul>
            <div className="sendDiv">
                <input type="text" id="inp" placeholder="Type your message here." />
                <button className="sendBtn" onClick={handleAddItem}>Send</button>
            </div>

        </div >
    );
}


