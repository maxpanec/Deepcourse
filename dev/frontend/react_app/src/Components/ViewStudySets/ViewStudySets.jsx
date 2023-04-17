import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
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

  const handleStudySetClick = (setId) => {
    // Handle the study set click event, e.g. navigate to study set page
    console.log('Study Set clicked with id:', setId);
    navigate(`/flashcard-view/${setId}`); // Use navigate function to navigate to the desired route
  };

  const handleRemoveStudySet = (setId) => {
    // Handle the study set removal event, e.g. send a request to remove study set
    console.log('Study Set removed with id:', setId);
  };

  if(props.user === null) {
    return <Navigate replace to="/needtosignin"/>
  }
  else return (
    <div className="study-sets-container">
      <h1 className="study-sets-title">Study Sets</h1>
      <div className="study-sets-grid">
        {studySets.map((set) => (
          <div key={set.id} className="study-set-box" onClick={() => handleStudySetClick(set.id)}>
            <h3 className="study-set-name">{set.name}</h3>
            <p className="study-set-category">Category: {set.category}</p>
            <p className="study-set-description">Description: {set.description}</p>
            <button
              className="remove-study-set-button"
              onClick={() => handleRemoveStudySet(set.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudySets;
