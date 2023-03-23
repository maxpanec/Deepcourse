import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField } from '@mui/material';
import "./CreateSet.css"

const CreateSet = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState({ 
        title: "", 
    });
    const [cards, setCards] = useState([]);
    const columns = ["question", "answer"];
    const [error, setError] = useState("");
    
    const [data, setData] = useState({
        username: "",
        setName: "",
        cards: [],
    });

    const loggedInUser = localStorage.getItem('data');

    if(loggedInUser === null) {
        return <Navigate replace to="/signin"/>
    }
    else{
        const info = JSON.parse(loggedInUser);
        const username = info.username;
    
        const handleAddRow = () => {
            const item = {};
            setCards([...cards, item]);
            setData({
                ...data,
                username: username,
                setName: title,
                cards: cards,
            });
        };
    
        const handleRemoveRow = (number) => {
            const temp = [...cards];
            temp.splice(number, 1);
            setCards(temp);
            setData({
                ...data,
                cards: temp,
            });
        }
    
        const updateState = (e) => {
            let prope = e.target.attributes.column.value;
            let index = e.target.attributes.index.value; 
            let fieldValue = e.target.value;
        
            const temp = [...cards]; 
            const tempObj = cards[index];  
            tempObj[prope] = fieldValue; 
            
            temp[index] = tempObj;
            setCards(temp);
            setData({
                ...data,
                username: username,
                cards: temp,
            });
          };

        const handleTitleChange =  (e) => {
            setTitle(e.target.value)
            setData({
                ...data,
                username: username,
                setName: e.target.value,
            }); 
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(data);
            try {
                const url = "http://localhost:3001/flashcards/flashcard-set"
                await axios.post(url, data);
                navigate("/");
                window.location.reload();
            }
            catch(error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                }
            }
        }
    
        return (
            <div className='center-div'>
                <div className="create-set-container">
                <form onSubmit={handleSubmit}>
                    <div className="title-field">
                        <TextField
                            name="title"
                            label="Set title"
                            type="text"
                            variant="outlined"
                            onChange={handleTitleChange}
                            required
                            InputLabelProps={{
                                style: {color: 'white'}
                            }}
                            inputProps={{
                                style: {color: 'white'}
                            }}
                            fullWidth
                        />
                    </div>
                    <div className='Flashcard-container'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='center-text'>#</th>
                                    {
                                        columns.map((column, index) => (
                                            <th className='center-text' key={index}>
                                                {column}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cards.map((item, index) => (
                                        <tr key={index}>
                                            <td className='center-text'>{index + 1}</td>
                                            {columns.map((column, idx) => (
                                                <td key={idx}>
                                                    <textarea className='area'
                                                        type='text'
                                                        value={cards[index][column]}
                                                        index={index}
                                                        column={column}
                                                        onChange={(e) => updateState(e)}
                                                        required/>
                                                </td> 
                                            ))}
                                            <td>
                                                <button
                                                    className="btn-rm"
                                                    onClick={() => handleRemoveRow(index)}
                                                    type="button">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <button onClick={handleAddRow} className="btn-add" type='button'>Add Row</button>
                    </div>
                    <div className='msg-container'>{error && <div className="error_msg">{error}</div>}</div>
                    <button onSubmit={handleSubmit} className="btn-create">Create Set</button>
                </form>
            </div>
            </div>
        );
    }
}

export default CreateSet;