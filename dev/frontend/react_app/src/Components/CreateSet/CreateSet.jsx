import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField } from '@mui/material';
import "./CreateSet.css"

const CreateSet = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState({ 
        title: "", 
    });
    const [cards, setCards] = useState([{question: "", answer: ""}]);
    const [draggingIndex, setDraggingIndex] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleQuestionChange = (e, index) => {
        const temp = [...cards];
        temp[index].question = e.target.value;
        setCards(temp);
    }

    const handleAnswerChange = (e, index) => {
        const temp = [...cards];
        temp[index].answer = e.target.value;
        setCards(temp);
    } 

    const [error, setError] = useState("");

    const loggedInUser = localStorage.getItem('data');

    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    if(loggedInUser === null) {
        return <Navigate replace to="/needtosignin"/>
    }
    else{
        const info = JSON.parse(loggedInUser);
        const username = info.username;
    
        const handleAddRow = () => {
            setCards([...cards, { question: "", answer: ""}]);
        };
    
        const handleRemoveRow = (index) => {
            let temp = [...cards];
            temp.splice(index, 1);
            setCards(temp.map((row, index) => ({ ...row, index: index + 1 })));
        };

        const handleDragStart = (event, index) => {
            setDraggingIndex(index);
          };
        
        const handleDragOver = (event, index) => {
            event.preventDefault();
            if (draggingIndex !== null) {
              const temp = [...cards];
              const removedRow = temp.splice(draggingIndex, 1)[0];
              temp.splice(index, 0, removedRow);
              setCards(temp);
              setDraggingIndex(index);
            }
        };
        
        const handleDragEnd = () => {
            setDraggingIndex(null);
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const url = "http://localhost:3001/flashcards/flashcard-set"
                console.log({
                    username: username,
                    setName: title,
                    cards: cards
                });
                await axios.post(url, {
                    username: username,
                    setName: title,
                    cards: cards
                })
                navigate("/");
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
                                    <th className='center-text'>Question</th>
                                    <th className='center-text'>Answer</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cards.map((item, index) => (
                                        <tr key={index}>
                                            <td 
                                                className='center-text index-col'
                                                draggable="true"
                                                onDragStart={(event) => handleDragStart(event, index)}
                                                onDragOver={(event) => handleDragOver(event, index)}
                                                onDragEnd={handleDragEnd}>
                                                    {index + 1}
                                            </td>
                                            <td>
                                                <textarea className='area'
                                                    type='text'
                                                    value={item.question}
                                                    onChange={(e) => handleQuestionChange(e, index)}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <textarea className='area'
                                                    type='text'
                                                    value={item.answer}
                                                    onChange={(e) => handleAnswerChange(e, index)}
                                                    required
                                                />
                                            </td>
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