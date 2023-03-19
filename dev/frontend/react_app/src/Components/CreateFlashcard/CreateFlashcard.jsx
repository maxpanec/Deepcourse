import React from 'react';
import { useState } from "react";
import "./CreateFlashcard.css";

function CreateFlashcard({ onAddFlashcard }) {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFlashcard({ front: frontText, back: backText });
    setFrontText("");
    setBackText("");
  };

  return (
    <div className="create-flashcard">
      <h1>Create Flashcard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Front:
          <input
            type="text"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
          />
        </label>
        <label>
          Back:
          <input
            type="text"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
          />
        </label>
        <button type="submit">Add Flashcard</button>
      </form>
    </div>
  );
}

export default CreateFlashcard;