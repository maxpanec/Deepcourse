import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css"

//navagation bar
const Navbar = (props)  => {
    //initialization
	const navigate = useNavigate();

    //provide warning if user want to logout
    const signout = () => {
        const resp = window.confirm("Do you want to logout?");
        //yes: remove user information, and redirect
        if(resp){
            localStorage.clear();
            navigate("/");
        }
    }

    //HTML code
    return (
        <div className='navbar'>
            <div className='navbar_title'>
                <header>
                    <h1>Study Sets</h1>
                </header>
            </div>
            <div className='navbar_links'>
                {/* links to different pages */}
                <ul>
                    <Link to='/'><li className='navbar_item'>Home</li></Link>
                    <Link to='/create-set'><li className='navbar_item'>Create Flashcards</li></Link> 

                    <Link to='/view-studysets'><li className='navbar_item'>View Flashcards</li></Link> 
                    {/* user detection -- signin and signout display in different situation */}
                    {
                        props.user ?
                        <Link onClick={signout}><li className='navbar_item'>Sign Out</li></Link> :
                        <Link to='/signin'><li className='navbar_item'>Sign In</li></Link>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar