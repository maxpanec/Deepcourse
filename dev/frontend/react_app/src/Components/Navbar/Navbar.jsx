import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css"

const Navbar = (props)  => {
	const navigate = useNavigate();
    const signout = () => {
        const resp = window.confirm("Do you want to logout?");
        if(resp){
            localStorage.clear();
            navigate("/");
            Navbar.location.reload();
        }
    }

    return (
        <div className='navbar'>
            <div className='navbar_title'>
                <header>
                    <h1>Study Sets</h1>
                </header>
            </div>
            <div className='navbar_links'>
                <ul>
                    <Link to='/'><li className='navbar_item'>Home</li></Link>
                    <Link to='/create-set'><li className='navbar_item'>Create Flashcards</li></Link> 
                    <Link to='/view-studysets'><li className='navbar_item'>View Flashcards</li></Link>
                    <Link to='/quiz'><li className='navbar_item'>Test Quiz</li></Link>

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