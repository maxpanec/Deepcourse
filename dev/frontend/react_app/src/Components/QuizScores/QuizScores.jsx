import React, { useState, useEffect } from 'react';
import './QuizScores.css';

function QuizScores() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        // Sample data of quiz scores with corresponding dates
        const sampleScores = [
            { score: 80, date: '2022-04-10' },
            { score: 90, date: '2022-04-15' },
            { score: 70, date: '2022-04-20' },
            { score: 95, date: '2022-04-25' },
            { score: 100, date: '2022-04-27' },
            { score: 70, date: '2022-04-28' },
        ];

        setScores(sampleScores);
    }, []);

    return (
        <div className="quiz-scores-container">
            <h2 className="quiz-scores-heading">Quiz Scores</h2>
            <div className="quiz-scores-graph">
                {scores.map((quiz) => (
                    <div
                        className="quiz-scores-bar"
                        style={{ height: `${quiz.score}%` }}
                        key={quiz.date}
                    >
                        <div className="quiz-scores-date">{quiz.date}</div>
                        <div className="quiz-scores-score">{quiz.score}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizScores;
