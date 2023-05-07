import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "./Forget_username.css"

//Forget username page
const ForgetUsername = () => {
    //get user data && initialization
    const navigate = useNavigate();
    const loggedin = localStorage.getItem('data');

	const [data, setData] = useState({ 
		email: "", 
	});
	const [error, setError] = useState("");

    /**
     * Change target variable based on e
     * @param {*} e  contains item name and item value
     */
    const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    /**
     * Connects to back end and guide to next page if successs
     * @param {*} e event parameter
     */
    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            //connect to backend api and pass data if no error
			const url = "https://studysets.herokuapp.com/accounts/forget-username";
			await axios.post(url, data);
			navigate(
                '/forget-username/reset',
                {state: data}
            );
			window.location.reload();
		} 
        //error checks
        catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    //theme
    const darkTheme = createTheme({ palette: {mode: 'dark'} });

    //checks user logged in or not, if no
    if(loggedin === null){
        //HTML code
        return (
            <div className="forget_username_container">
                <h1 className="header">Enter Email</h1>
                <form onSubmit={handleSubmit}>
                    <ThemeProvider theme={darkTheme}>
                        <div className="forget-field-container">
                            <TextField
                                name="email"
                                label="Email"
                                type="text"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>
                        {error && <div className="error_msg">{error}</div>}
                        <Button type='submit' variant="contained" color="primary" fullWidth>Submit</Button>
                    </ThemeProvider>
                </form>
                <div className="back" >
                    <Button
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        component={Link}
                        to="/signin">
                        Back
                    </Button>
                </div>
                
            </div>
        );
    }
    //if yes, back to home page
    else{
        return <Navigate replace to="/"/>
    }
};

export default ForgetUsername;
