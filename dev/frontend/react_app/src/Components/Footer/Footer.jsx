import React from 'react';
import { Link } from "react-router-dom";

import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer_div'>
        <footer className='footer'>
            <div className='links'>
                <Link to="/about" className='link about'><b>About Us</b></Link>
                <Link to="/contact" className='link contact'><b>Contact Us</b></Link>
            </div>
            <hr className='line'/>
            <div>
                <p className='footer-content'>
                    &copy; 2023 DeepCourse
                </p>
            </div>
        </footer>
    </div>
  );
};

export default Footer;