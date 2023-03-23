import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css"

const Navbar = (props)  => {
	const navigate = useNavigate();
    const signout = () => {
        localStorage.clear()
        navigate("/");
        window.location.reload()
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
                    {
                        props.user ?
                        <Link to='/create-set'><li className='navbar_item'>Create Flashcards</li></Link> :
                        <Link to='/signin'><li className='navbar_item'>Create Flashcards</li></Link>
                    }
                    {
                        props.user ?
                        <Link to='/view-set'><li className='navbar_item'>View Flashcards</li></Link> :
                        <Link to='/signin'><li className='navbar_item'>View Flashcards</li></Link>
                    }
                    {
                        props.user ?
                        <Link onClick={signout} to='/'><li className='navbar_item'>Sign Out</li></Link> :
                        <Link to='/signin'><li className='navbar_item'>Sign In</li></Link>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar