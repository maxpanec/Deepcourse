import React from 'react';

const Homepage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to Study Sets</h1>
        <div style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.5', fontSize: '18px' }}>
          <p>This is a web app that helps users study for anything ranging from school exams to different kinds of cutlery. Users will be able to create and customize their own flashcards sets to help them learn their desired material. Users will also be able to take a quiz based on a given flashcard set; they will be able to select from a few different quiz formats and a quiz will be generated for them based on the original flashcards. Users can see a timeline of their quiz scores for a given flashcard set.</p>
        </div>
        <p>Here are some links to get you started:</p>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;