import React from 'react';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="https://i.imgur.com/TUtegR6.png" alt="Person studying" style={{ maxWidth: '100%', marginBottom: '20px' }} />
        <h1>Welcome to Study Sets</h1>
        <div style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.5', fontSize: '18px' }}>
          <p>Study Sets allows users to create and customize their own flashcards sets to study any topic. You can take customizable quizzes that are generated based on the questions and answers from your flashcard set. It also offers quizzes with different formats and tracks users' performance in a timeline. Just create an account to get started.</p>
        </div>
        <div>
          <a href="/about" style={{ display: 'inline-block', marginRight: '20px' }}>About Us</a>
          <a href="/contact" style={{ display: 'inline-block' }}>Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;