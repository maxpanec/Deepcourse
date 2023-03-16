import React from 'react';
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Signin.css'


const Signin = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({ 
		username_email: "", 
		password: "" 
	});
	const [error, setError] = useState("");
	
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3001/accounts/signin";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("data", JSON.stringify(res));
			navigate("/");
			window.location.reload()
		} catch (error) {
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


	return (
        <div className="signin_container">
            <h1 className="header" >Login to Account</h1>
            <form onSubmit={handleSubmit}>
                <ThemeProvider theme={darkTheme}>
                    <div className='signin_field_container'>
                        <TextField
                            name="username_email"
                            label="Email or Username"
                            type="text"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleChange}
                            autoFocus
                        />
                        <Link to='/forget-username' className='forgets'>Forget Username?</Link>
                    </div>
                    
                    <div className='signin_field_container'>
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleChange}
                        />
                        <Link to='/forget-password' className='forgets'>Forget Password?</Link>
                    </div>
                </ThemeProvider>
                {error && <div className="error_msg">{error}</div>}
                <Button type='submit' variant="contained" color="primary" fullWidth>Sign In</Button>
            </form>
            <h3 className='question' style={{}}>Don't have an account?</h3>
            <div className='signup'>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    component={Link}
                    to='/signup'>
                    Sign Up
                </Button>
            </div>
        </div>
	);
};

export default Signin;