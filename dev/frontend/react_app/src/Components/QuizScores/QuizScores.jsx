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
        if (score === 0) {
            return '80px';
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

    return (
        <div className="quiz-scores-container">
            <h2 className="quiz-scores-heading">Quiz Scores</h2>
            <div className="quiz-scores-graph">
                {scores.map((quiz) => (
                    <div className="quiz-scores-bar" style={{ height: getBarHeight(quiz.score) }} key={quiz.date}>
                        <div className="quiz-scores-score">{quiz.score}</div>
                        <div className="quiz-scores-date">{formatDate(quiz.date)}</div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default QuizScores;
