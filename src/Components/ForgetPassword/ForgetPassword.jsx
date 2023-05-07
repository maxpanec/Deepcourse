import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Forget_password.css'

//Forget password page
const ForgetPassword = () => {
    //gets user logged in or not
    const loggedin = localStorage.getItem('data');

    //initialization
    const navigate = useNavigate();
	const [data, setData] = useState({ 
		email: "", 
		username: "" 
	});
	const [error, setError] = useState("");

    /**
     * changing target textfield information
     * @param {*} e event parameter
     */
    const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

    /**
     * check user existance via backend
     * @param {*} e event parameters
     */
    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            //connect to backend api
			const url = "https://studysets.herokuapp.com/accounts/forget-password";
			await axios.post(url, data);
			navigate(
                '/forget-password/reset',
                //pass data
                {state: data}
            );
		} 
        //error catching
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

    const darkTheme = createTheme({ palette: {mode: 'dark'} });

    //if not logged in
    if(loggedin === null){
        //HTML code
        return (
            <div className="forget_password_container">
                <h1 className="header">Enter Username and Email</h1>
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
    
                        <div className="forget-field-container">
                            <TextField
                                name="username"
                                label="Username"
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
    //if logged in, redirect to home page.
    else{
        return <Navigate replace to="/"/>
    }
};

export default ForgetPassword;