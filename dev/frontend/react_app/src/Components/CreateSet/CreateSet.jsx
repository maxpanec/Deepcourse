import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField } from '@mui/material';
import "./CreateSet.css"

const CreateSet = () => {
    // setup use states
    const navigate = useNavigate();
    const [title, setTitle] = useState({ 
        title: "", 
    });
    const [cards, setCards] = useState([{question: "", answer: ""}]);
    const [draggingIndex, setDraggingIndex] = useState(null);

    /**
     * Title on change
     * @param {*} e event that contains user input
     */
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    /**
     * Question on change
     * @param {*} e event that contains user input
     * @param {*} index contains the index of the question section in table
     */
    const handleQuestionChange = (e, index) => {
        const temp = [...cards];
        temp[index].question = e.target.value;
        setCards(temp);
    }

    /**
     * Answer on change
     * @param {*} e event that contains user input
     * @param {*} index contains the index of the answer section in table
     */
    const handleAnswerChange = (e, index) => {
        const temp = [...cards];
        temp[index].answer = e.target.value;
        setCards(temp);
    } 

    //error use state
    const [error, setError] = useState("");

    //receive user data
    const loggedInUser = localStorage.getItem('data');

    //detects refresh and give warning
    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    //check user existance: not then navigate
    if(loggedInUser === null) {
        return <Navigate replace to="/signin"/>
    }
    //user exists
    else{
        //gather user information
        const info = JSON.parse(loggedInUser);
        const username = info.username;
    
        /**
         * add a new row for the table
         */
        const handleAddRow = () => {
            setCards([...cards, { question: "", answer: ""}]);
        };
    
        /**
         * remove a row by the index of the row
         * @param {*} index row that needs to be removed
         */
        const handleRemoveRow = (index) => {
            let temp = [...cards];
            temp.splice(index, 1);
            setCards(temp.map((row, index) => ({ ...row, index: index + 1 })));
        };

        /**
         * Dragging event that detect when user clicks on the index
         * @param {*} event (not use in this case)
         * @param {*} index (store the index number)
         */
        const handleDragStart = (event, index) => {
            setDraggingIndex(index);
          };
        
        /**
         * Dragging event that checks the in progress dragging
         * Change the row location and row number of while dragging up or down
         * @param {*} event event parameter
         * @param {*} index index that the row needs to move to
         */
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
        
        /**
         * Detect when user release the mouse
         */
        const handleDragEnd = () => {
            setDraggingIndex(null);
        };
    
        /**
         * Submit all user input to database
         * @param {*} e event parameter
         */
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                //push to database (use backend api)
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
                //redirect to home page
                navigate("/");
            }
            //error catching
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
    
        //HTML code comes here
        return (
            <div className='center-div'>
                <div className="create-set-container">
                <form onSubmit={handleSubmit}>
                    {/* Title textfield */}
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
                    {/* Dynamic Table */}
                    <div className='Flashcard-container'>
                        <table className='table'>
                            <thead>
                                {/* Table Header */}
                                <tr>
                                    <th className='center-text'>#</th>
                                    <th className='center-text'>Question</th>
                                    <th className='center-text'>Answer</th> 
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody>
                                {
                                    // create a dynamic table
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
                        {/* Add row button */}
                        <button onClick={handleAddRow} className="btn-add" type='button'>Add Row</button>
                    </div>
                    {/* Error message, only display if any */}
                    <div className='msg-container'>{error && <div className="error_msg">{error}</div>}</div>
                    {/* Submit button */}
                    <button onSubmit={handleSubmit} className="btn-create">Create Set</button>
                </form>
            </div>
            </div>
        );
    }
}

export default CreateSet;