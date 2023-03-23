import React, { useMemo }  from 'react';
import { render } from 'react-dom'
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./CreateSet.css"

const CreateSet = () => {
	const navigate = useNavigate();

    const info = JSON.parse(localStorage.getItem('data'));
    const username = info.username;

	const [title, setTitle] = useState({ 
		title: "", 
	});
    const [cards, setCards] = useState([]);
    const columns = ["question", "answer"];

    const handleAddRow = () => {
        const item = {};
        setCards([...cards, item]);
    };

    const handleRemoveRow = (number) => {
        const temp = [...cards];
        temp.splice(number, 1);
        setCards(temp);
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
      };

	const [error, setError] = useState("");

    const [data, setData] = useState({
        id: "",
        setName: "",
        QnAs: [],
    });

    const handleSubmit = async (e) => {
		e.preventDefault();
        setData({
            ...data,
            id: username,
            setName: title,
            QnAs: cards,
        });
        try {
            const url = "http://localhost:3001/flashcards/flashcard-set"
            await axios.get(url, data);
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
                        onChange={(e) => setTitle(e.target.value)}
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
                {error && <div className="error_msg">{error}</div>}
                <button onSubmit={handleSubmit} className="btn-create">Create Set</button>
            </form>
        </div>
        </div>
    );
}

export default CreateSet;