import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./ResetUsername.css"

const ResetUsername = (props) => {
    const location = useLocation();

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        username: "",
    })
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({ ...data, 
            email: location.state.email,
            [e.target.name]: e.target.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const url = "http://localhost:3001/accounts/forget-username/reset";
			const { data: res } = await axios.post(url, data);
            if(props.user != null)
                localStorage.setItem("data", JSON.stringify(res.data));
		    navigate('/');
		    window.location.reload();
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

    if(location.state === null){
        return <Navigate replace to="/"/>
    }
    else{
        return (
            <div className="reset_username_container">
                <h1 style={{color: "#1976d2", marginBottom: "1em", marginTop : "0em"}}>Reset Username</h1>
                <form onSubmit={handleSubmit}>
                    <ThemeProvider theme={darkTheme}>
                        <div className='reset_username_field_container'>
                        <TextField
                            name="username"
                            label="New Username"
                            type="text"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleChange}
                            autoFocus
                        />
                    </div>
                    </ThemeProvider>
                    {error && <div className="error_msg">{error}</div>}
                    <Button type='submit' variant="contained" color="primary" fullWidth>Reset Username</Button>
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
}

export default ResetUsername;
