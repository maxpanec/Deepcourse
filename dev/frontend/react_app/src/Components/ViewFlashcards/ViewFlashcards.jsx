import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ViewFlashcards.css';

function ViewFlashcards(props) {
  const [flashcards, setFlashcards] = useState([
     { id: 1, frontText: "C++ beginner", backText: "React is a JavaScript library for building user interfaces.", category: "Programming" },
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

  return (
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

export default ViewFlashcards;
