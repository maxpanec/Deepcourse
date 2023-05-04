import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './QuizScores.css';
import axios from 'axios';

const QuizScores = (props) => {
    const { id } = useParams();
    const [scores, setScores] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/quiz/scores', {
                    params: { id: id }
                });
                const sortedScores = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setScores(sortedScores);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const getBarHeight = (score) => {
        if (score === 0) {
            return '100px';
        } else {
            const barHeight = score / 100; // adjust this calculation as needed
            return `${barHeight * 400}px`; //
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.toLocaleDateString()}`
        const formattedTime = `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        return `${formattedDate}\n${formattedTime}`;
    };

    const handleNextClick = () => {
        if (startIndex + 5 < scores.length) {
            setStartIndex(startIndex + 5);
        }
    };

    const handlePrevClick = () => {
        if (startIndex - 5 >= 0) {
            setStartIndex(startIndex - 5);
        }
    };

    const displayedScores = scores.slice(startIndex, startIndex + 5);

    return (
        <div className="quiz-scores-container">
            <h2 className="quiz-scores-heading">Quiz Scores</h2>
            <div className="quiz-scores-graph">
                {displayedScores.map((quiz) => (
                    <div
                        className="quiz-scores-bar"
                        style={{ height: getBarHeight(quiz.score) }}
                        key={quiz.date}
                    >
                        <div className="quiz-scores-score">{(quiz.score).toFixed(2)}</div>
                        <div className="quiz-scores-date">{formatDate(quiz.date)}</div>
                    </div>
                ))}
            </div>
            <div className="quiz-scores-nav">
                <button className="quiz-scores-nav-button" onClick={handlePrevClick} disabled={startIndex === 0}>
                    Previous
                </button>
                <button className="quiz-scores-nav-button" onClick={handleNextClick} disabled={startIndex + 5 >= scores.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default QuizScores;
