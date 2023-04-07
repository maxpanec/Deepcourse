/*import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewFlashcards.css';

function ViewFlashcards(props) {
  const [flashcards, setFlashcards] = useState([
     { id: 1, frontText: "C++ beginner", backText: "C++ for noobs", category: "Programming" },
    { id: 2, frontText: "France", backText: "Places in France", category: "Geography" },
    { id: 3, frontText: "Chemistry elements", backText: "Fe, Al, Cu, etc", category: "Chemistry" },
  ]);

  /*useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/flashcards/${props.match.params.setId}`);
      setFlashcards(response.data);
    }
    fetchData();
  }, [props.match.params.setId]);*/

  /*return (
    <div>
      <h1>Viewing all flashcards</h1>
      {flashcards.map(flashcard => (
        <div key={flashcard.id}>
          <h2>{flashcard.frontText}</h2>
          <p>{flashcard.backText}</p>
          <p>Category: {flashcard.category}</p>
          <Link to={`/edit-flashcard/${flashcard.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}

export default ViewFlashcards; */

import React, { useState } from 'react';
import './ViewFlashcards.css'; // Import the CSS file

const ViewFlashcards = () => {
  // State to hold the list of quizzes
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Quiz 1', description: 'This is quiz 1', category: 'Category 1' },
    { id: 2, title: 'Quiz 2', description: 'This is quiz 2', category: 'Category 2' },
    { id: 3, title: 'Quiz 3', description: 'This is quiz 3', category: 'Category 1' },
    // Add more quizzes as needed
  ]);

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">View Flashcards</h1>
      <div className="quiz-list">
        <h2 className="quiz-list-title">Quizzes</h2>
        <div className="quiz-grid">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="quiz-box">
              <h3 className="quiz-box-title">{quiz.title}</h3>
              <p className="quiz-box-description">{quiz.description}</p>
              <p className="quiz-box-category">Category: {quiz.category}</p>
              <a href={`/quiz/${quiz.id}`} className="quiz-box-link">Start Quiz</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFlashcards;