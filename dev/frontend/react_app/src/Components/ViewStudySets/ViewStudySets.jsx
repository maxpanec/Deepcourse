import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from '@mui/material';
import axios from 'axios';
import './ViewStudySets.css';

const ViewStudySets = (props) => {
  const navigate = useNavigate();

  const [studySets, setStudySets] = useState([]);

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
  };

  const handleScoresStudySet = (setId) => {
    // Handle the study set scores event, e.g. navigate to study set score page
    //navigate(`/scores/${setId}`); // Use navigate function to navigate to the desired route
  };

  const handleRemoveStudySet = (setId) => {
    // Handle the study set removal event, e.g. send a request to remove study set
  };

  if(props.user === null) {
    return <Navigate replace to="/needtosignin"/>
  }
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
    </div>
  );
};

export default ViewStudySets;