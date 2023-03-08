import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Signup.css'


const Signup = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({ 
		email: "",
        username: "",  
		password: "" 
	});
	const [error, setError] = useState("");
	
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3001/accounts/signup";
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>
                </ThemeProvider>
                {error && <div className="error_msg">{error}</div>}
                <Button type='submit' variant="contained" color="primary" fullWidth>Sign Up</Button>
            </form>
        </div>
	);
};

export default Signup;