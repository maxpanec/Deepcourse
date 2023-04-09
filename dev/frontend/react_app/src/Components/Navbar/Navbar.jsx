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
                    {/* Eventually, this link should be removed from the Navbar */}
                    {/* Should only be accessed by clicking on an individual study set from the view-all page */}
                    {/* The parameter after flashcard-view/ is the ID of the individual flashcard set */}
                    <Link to='/flashcard-view/6430c007f2eced61991f2b1d'><li className='navbar_item'>View Flashcard Set</li></Link>

                    <Link to='/create-set' onClick={() => window.location.href('/create-set')}><li className='navbar_item'>Create Flashcards</li></Link> 
                    <Link to='/view-studysets'><li className='navbar_item'>View Flashcards</li></Link> 
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