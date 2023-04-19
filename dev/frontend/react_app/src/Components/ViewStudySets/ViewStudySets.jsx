import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { withStyles } from '@mui/styles';
import { lightBlue } from '@mui/material/colors';
import axios from 'axios';
import Popup from "reactjs-popup"
import './ViewStudySets.css';

const ViewStudySets = (props) => {
  //initialization
  const navigate = useNavigate();

  const [studySets, setStudySets] = useState([]);
  const [quizType, setQuizType] = useState("");
  const [opened, setOpened] = useState(false);
  const [quizSetID, setQuizSetID] = useState("");
  const [error, setError] = useState("");

  //gather user flashcards information
  useEffect(() => {
    if(props.user === null)
      return;
    const fetchStudySets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/flashcards/flashcard-sets-info', {
          params: { username: props.user.username },
        });
        setStudySets(response.data.data);
      } catch (error) {
        console.log('Failed to fetch study sets:', error);
      }
    };
    fetchStudySets();
  }, [props.user]);

  const handleViewStudySet = (setId) => {
    // Handle the study set view event, e.g. navigate to study set page
    navigate(`/flashcard-view/${setId}`); // Use navigate function to navigate to the desired route
  };

  const handleQuizStudySet = (setId) => {
    // Handle the study set quiz event, e.g. prompt for which type of quiz
    setOpened(true);
    setQuizSetID(setId);
  };

  const handleScoresStudySet = (setId) => {
    // Handle the study set scores event, e.g. navigate to study set score page
    //navigate(`/scores/${setId}`); // Use navigate function to navigate to the desired route
  };

  const handleRemoveStudySet = (setId) => {
    // Handle the study set removal event, e.g. send a request to remove study set
  };

  //change the radio button for popup quiz mode selection
  const handleChange = (e) => {
    setQuizType(e.target.value);
  };

  //go to next page for quiz if no failure
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quizType, quizSetID);
    if(quizType === ""){
        setError("Please select an option!");
        return;
    }
    else{
        navigate(`/quiz/${quizSetID}?type=${quizType}`);
    }
  }

  //close the popup box, and clear all previous information if any
  const handleClose = () => {
    setQuizType("");
    setOpened(false);
    setQuizSetID("");
  }

  const LightBlueRadio = withStyles({
    root: {
      color: lightBlue[400],
      "&$checked": {
        color: lightBlue[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  //navigate to request sign in page if not signed in
  if(props.user === null) {
    return <Navigate replace to="/needtosignin"/>
  }
  //HTML Code
  else return (
    <div className="study-sets-container">
        <h1 className="study-sets-title">Study Sets</h1>
        <div className="study-sets-grid">
          {studySets.map((set) => (
          <div key={set.id} className="study-set-box">
            <h3 className="study-set-name">{set.name}</h3>
              <div className="study-sets-button-grid">
                <div className="study-sets-button-row">
                  <Button variant="text" onClick={() => handleViewStudySet(set.id)}>View</Button>
                  <Button variant="text" onClick={() => handleQuizStudySet(set.id)}>Quiz</Button>
                </div>
                <div className="study-sets-button-row">
                  <Button variant="text" onClick={() => handleScoresStudySet(set.id)}>Scores</Button>
                  <Button variant="text" onClick={() => handleRemoveStudySet(set.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div>
        <Popup
          open={opened}
          onClose={handleClose}
          modal nested>
            {
              () => (
                <div className='pop-container'>
                  <div className='PopHeader'>
                    <h1>Which type of quiz you want to take?</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="radio">
                        <FormControl>
                          <RadioGroup
                            value={quizType}
                            onChange={handleChange}>
                              <FormControlLabel value="MC" control={<LightBlueRadio/>} label="Multiple Choice"/>
                              <FormControlLabel value="ToF" control={<LightBlueRadio/>} label="True/False"/>
                              <FormControlLabel value="SA" control={<LightBlueRadio/>} label="Fill in the blank"/>
                          </RadioGroup>
                        </FormControl>
                      </div>

                      {error && <div className="error_msg">{error}</div>}

                      <div className="btns continue-btn" >
                        <Button type='submit' variant="contained" color="primary" fullWidth> 
                          Continue
                        </Button>
                      </div>

                      <div className="btns back-btn">
                        <Button variant="contained" style={{backgroundColor: "#21b6ae"}} fullWidth onClick={(e) => handleClose(e)}>
                          Back
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )
            }
        </Popup>
      </div>
    </div>
  );
};

export default ViewStudySets;