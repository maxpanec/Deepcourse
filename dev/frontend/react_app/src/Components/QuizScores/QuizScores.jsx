import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './QuizScores.css';
import axios from 'axios';

const QuizScores = (props) => {
    const { id } = useParams();
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/quiz/scores', {
                    params: { id: id }
                },
                );
                setScores(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const getBarHeight = (score) => {
        //const minScore = Math.min(...scores.map((quiz) => quiz.score));
        //const maxScore = Math.max(...scores.map((quiz) => quiz.score));
        //const barHeight = (score - minScore) / (maxScore - minScore) * 100;
        //return `${barHeight}%`;
        const barHeight = score / 100; // adjust this calculation as needed
        return `${barHeight * 400}px`; // set the height to a fixed value or adjust dynamically
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate}<br>${formattedTime}`;
    };

    return (
        <div className="quiz-scores-container">
            <h2 className="quiz-scores-heading">Quiz Scores</h2>
            <div className="quiz-scores-graph">
                {scores.map((quiz) => (
                    <div
                        className="quiz-scores-bar"
                        style={{ height: getBarHeight(quiz.score) }}
                        key={quiz.date}
                    >
                        <div className="quiz-scores-score">{quiz.score}</div>
                        <div className="quiz-scores-date" dangerouslySetInnerHTML={{ __html: formatDate(quiz.date) }} />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizScores;
