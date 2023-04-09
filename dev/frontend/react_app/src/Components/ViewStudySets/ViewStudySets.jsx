import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './ViewStudySets.css';

const ViewStudySets = (props) => {
  const navigate = useNavigate();

  const [studySets, setStudySets] = useState([
    { id: 1, name: 'Study Set 1', category: 'Science', description: 'This is Study Set 1' },
    { id: 2, name: 'Study Set 2', category: 'History', description: 'This is Study Set 2' },
    { id: 3, name: 'Study Set 3', category: 'Math', description: 'This is Study Set 3' },
    // Add more sample data as needed
  ]);

  useEffect(() => {
    const fetchStudySets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/flashcards/flashcard-sets-info', 
        {params: {username: props.user.username}}
        );
        setStudySets(response.data.data)
        // navigate("/flashcard-view/64153e33e22b57cda9b80ffa")
      }
      catch (error) {
        console.log("test error")
      }
    };
    fetchStudySets()
  }, [props.user.username]);

  console.log(studySets)

  const handleStudySetClick = (setId) => {
    // Handle the study set click event, e.g. redirect to study set page
    console.log('Study Set clicked with id:', setId);
  };
  const handleRemoveStudySet = (setId) => {
    // Handle the study set removal event, e.g. send a request to remove study set
    console.log('Study Set removed with id:', setId);
  };

  return (
    <div className="study-sets-container">
      <h1 className="study-sets-title">Study Sets</h1>
      <div className="study-sets-grid">
        {studySets.map((set) => (
          <div key={set.id} className="study-set-box">
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