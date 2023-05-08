/* eslint-disable jsx-a11y/alt-text */
import user from '../../img/user.png';
import edit from '../../img/edit.png';
import inbox from '../../img/envelope.png';
import settings from '../../img/settings.png';
import help from '../../img/question.png';
import logout from '../../img/log-out.png';
import person from '../../img/person.jpeg';
import './dropdown.css';

import { useNavigate } from "react-router-dom";


import React, { useState, useEffect, useRef,useContext } from 'react';
import { testContext } from '../../context/testContext';

function DropDown() {
    const {getUserName}=  useContext(testContext);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                // console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div className="App">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    <img src={person}></img>
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >

                    <ul>
                        <div onClick={() => { navigate('/profile') }}><DropdownItem img={user} text={"My Profile"} /></div>

                        {/* <DropdownItem img={inbox} text={"Inbox"} /> */}
                        <DropdownItem img={settings} text={"Settings"} />
                        <div onClick={async() => { const UserName=await getUserName();alert(UserName); }}> <DropdownItem img={help} text={"Help"} /></div>
                        <div onClick={() => { navigate('/login') }}><DropdownItem img={logout} text={"Logout"} /></div>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img}></img>
            <a> {props.text} </a>
        </li>
    );
}

export default DropDown;
