import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './Signup.css'
import AccountError from '../AccountError/AccountError.jsx';

//Registration page
const Signup = () => {
    //initialization
	const navigate = useNavigate();
	const [signupData, setSignupData] = useState({ 
		email: "",
        username: "",  
		password: "" 
	});
    const [confirmPassword, setConfirmPassword] = useState("");

	const [error, setError] = useState("");
	
    /**
     * changing signup textfield information
     * @param {*} e event param
     */
	const handleSignupDataChange = (e) => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};

    /**
     * changing confirm password information
     * @param {*} e event param
     */
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    /**
     * check password and confirmed password the same, then connects to database for create user
     * @param {*} e event param
     * @returns display the error message if any
     */
	const handleSubmit = async (e) => {
		e.preventDefault();

        //check two password matching
        if(signupData.password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        
		try {
            //connect to backend api
			const url = "http://localhost:3001/accounts/signup";
			const { data: res } = await axios.post(url, signupData);
            //login automatically if success
			localStorage.setItem("data", JSON.stringify(res.data));
			navigate("/");
			window.location.reload()
		} 
        //Error catching
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

    //HTML code
	return (
        <div className="signup_container">
            <h1 style={{color: "#1976d2", marginBottom: "1em", marginTop : "0em"}}>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={darkTheme}>
                    <div className='signup_field_container'>
                        <TextField
                            name="email"
                            label="Email"
                            type="text"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleSignupDataChange}
                            autoFocus
                        />
                    </div>
                    <div className='signup_field_container'>
                        <TextField
                            name="username"
                            label="Username"
                            type="text"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleSignupDataChange}
                        />
                    </div>
                    <div className='signup_field_container'>
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleSignupDataChange}
                        />
                    </div>
                    <div className='signup_field_container'>
                        <TextField
                            name="confirm password"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                </ThemeProvider>
                {error && <AccountError message={error}/>}
                <Button type='submit' variant="contained" color="primary" fullWidth>Sign Up</Button>
            </form>
        </div>
	);
};

export default Signup;