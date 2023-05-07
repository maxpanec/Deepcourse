import React from 'react'
import { useNavigate } from "react-router-dom";
import './Error.css'

//Error Page (All pages that does not exist)
const Error = () => {
  const navigate = useNavigate();
  navigate("/");

  return (
    <div className="message">
        <h1>Page Not Found</h1>
    </div>
  )
}

export default Error;
