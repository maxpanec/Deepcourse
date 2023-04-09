import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewStudySets.css';

const ViewStudySets = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added isLoggedIn state

  const [studySets, setStudySets] = useState([
    { id: 1, name: 'Study Set 1', category: 'Science', description: 'This is Study Set 1' },
    { id: 2, name: 'Study Set 2', category: 'History', description: 'This is Study Set 2' },
    { id: 3, name: 'Study Set 3', category: 'Math', description: 'This is Study Set 3' },
    // Add more sample data as needed
  ]);

  useEffect(() => {
    // Comment out the actual API call if you want to use the sample data above
    // const fetchStudySets = async () => {
    //   try {
    //     const response = await axios.get('/api/flashcard-sets-info', {
    //       params: { username: 'your-username' }, // Update with your actual username
    //     });
    //     setStudySets(response.data.data);
    //   } catch (error) {
    //     console.error('Error fetching study sets:', error);
    //   }
    // };
    // fetchStudySets();

    // Example check for user login status
    const checkUserLoginStatus = async () => {
      try {
        const response = await axios.get('/api/check-user-login-status');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error checking user login status:', error);
      }
    };
    checkUserLoginStatus();
  }, []);

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
      {isLoggedIn ? ( // Display study sets only if user is logged in
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
      ) : (
        <p className="login-required-message">Please login to view study sets.</p>
      )}
    </div>
  );
};

export default ViewStudySets;