import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./ResetPassword.css"
import AccountError from "../../AccountError/AccountError";

//reset password page
const ResetPassword = () => {
    //initialization
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        confirmed_password: ""
    });

    const [error, setError] = useState("");

    const darkTheme = createTheme({ palette: {mode: 'dark'} });

    /**
     * changing target textfield
     * @param {*} e event parameter
     */
    const handleChange = (e) => {
        setData({ ...data, 
            email: location.state.email,
            username: location.state.username,         
            [e.target.name]: e.target.value});
	};

    /**
     * connects to backend and update the password if no error
     * @param {*} e event parameter
     */
    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const url = "http://localhost:3001/accounts/forget-password/reset";
			await axios.post(url, data);
		    navigate('/');
		    window.location.reload();
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

    //if not user information from previous page, redirect to home page
    if(location.state === null){
        return <Navigate replace to="/"/>
    }
    //if user information exists
    else{
        //HTML code
        return (
            <div className="reset_password_container">
                <h1 style={{color: "#1976d2", marginBottom: "1em", marginTop : "0em"}}>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <ThemeProvider theme={darkTheme}>
                        {/* new password text field */}
                        <div className='reset_password_field_container'>
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
                        {/* confirmed new password text field */}
                        <div className='reset_password_field_container'>
                        <TextField
                            name="confirmed_password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleChange}
                        />
                    </div>
                    </ThemeProvider>
                    {/* error message if any */}
                    {error && <AccountError message={error}/>}
                    {/* submit button */}
                    <Button type='submit' variant="contained" color="primary" fullWidth>Reset Password</Button>
                </form>
                {/* back button */}
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
}

export default ResetPassword;