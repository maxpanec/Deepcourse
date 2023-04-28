import React, { useState, useEffect } from "react";
import "./Quiz.css";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios"

let choices = [];

const Quiz = () => {
    const { id } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [buttonData, setButtonData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [error, setError] = useState("");
    const location = useLocation();
    const type = new URLSearchParams(location.search).get("type");
    const navigate = useNavigate();
    let res;

    useEffect(() => {
        for (let i = 0; i < userAnswers.length; i++) {
            if (userAnswers[i] !== undefined) {
                choices[i] = userAnswers[i];
            }
        }
        console.log(choices);
    }, [userAnswers]);

    const handleSubmit = async (e, userScore) => {
        e.preventDefault();
        console.log("score:" + userScore)
        const numQuestions = quizData.length;
        const numAnswers = userAnswers.filter((answer) => answer !== undefined).length;
        if (choices.length < 4 || choices.includes(undefined) || choices.includes("")) {
            setError("Please answer all questions before submitting.");
            return;
        }
        try {
            const url = "http://localhost:3001/quiz/score";
            await axios.put(url, {
                id: id,
                score: userScore
            })
            setError(userScore);
            setUserAnswers([]);
            choices = [];
            navigate(`/scores/${id}`);
        }
        catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        const getRes = async () => {
            res = await axios.get("http://localhost:3001/quiz/quiz", { params: { id: id, type: type } });
            let quizCards;
            let key = 0;
            let grade = () => {
                let score = 0;
                for (let i = 0; i < choices.length; i++) {
                    if (choices[i] !== undefined && choices[i].answer.toString().toLowerCase() === res.data.data[i].answer.toLowerCase()) {
                        score += 1;
                    }
                }
                score = (score / choices.length) * 100;
                return score;
            }
            let newButtonData = (
                <button className="submit-button" onClick={(e) => handleSubmit(e, grade())}>Submit</button>
            )
            if (type === "ToF") {
                quizCards = res.data.data.map((card, index) =>
                    <div className="question-card" key={index}>
                        <div className="question-data">
                            <div className="question-q">
                                <h2>{card.question}</h2>
                            </div>
                            <div className="question-a">
                                <h2>{card.answerInQuestion}</h2>
                            </div>
                        </div>
                        <div className="options-div">
                            <label>
                                <input type="radio" value="true" name={`question-${index}`} onChange={() => {
                                    const newUserAnswers = [...userAnswers];
                                    newUserAnswers[index] = { question: card.question, answer: true };
                                    setUserAnswers(newUserAnswers);
                                }} /> True
                            </label>
                            <label>
                                <input type="radio" value="true" name={`question-${index}`} onChange={() => {
                                    const newUserAnswers = [...userAnswers];
                                    newUserAnswers[index] = { question: card.question, answer: false };
                                    setUserAnswers(newUserAnswers);
                                }} /> False
                            </label>
                        </div>
                    </div>
                );
            }
            else if (type === "MC") {
                quizCards = res.data.data.map((card, index) =>
                    <div className="question-card">
                        <div className="question-data">
                            <h2 className="mc-question">{card.question}</h2>
                        </div>
                        <div className="options-div">
                            <label className="mc-label">
                                <input type="radio" value={card.choices[0]} name={`question-${index}`} onChange={() => {
                                    const newUserAnswers = [...userAnswers];
                                    newUserAnswers[index] = { question: card.question, answer: card.choices[0] };
                                    setUserAnswers(newUserAnswers);
                                }} /> {card.choices[0]}
                            </label>
                            <label className="mc-label">
                                <input type="radio" value={card.choices[1]} name={`question-${index}`} onChange={() => {
                                    const newUserAnswers = [...userAnswers];
                                    newUserAnswers[index] = { question: card.question, answer: card.choices[1] };
                                    setUserAnswers(newUserAnswers);
                                }} /> {card.choices[1]}
                            </label>
                            <label className="mc-label">
                                <input type="radio" value={card.choices[2]} name={`question-${index}`} onChange={() => {
                                    const newUserAnswers = [...userAnswers];
                                    newUserAnswers[index] = { question: card.question, answer: card.choices[2] };
                                    setUserAnswers(newUserAnswers);
                                }} /> {card.choices[2]}
                            </label>
                            <label className="mc-label">
                                <input type="radio" value={card.choices[3]} name={`question-${index}`} onChange={() => {
                                    const newUserAnswers = [...userAnswers];
                                    newUserAnswers[index] = { question: card.question, answer: card.choices[3] };
                                    setUserAnswers(newUserAnswers);
                                }} /> {card.choices[3]}
                            </label>
                        </div>
                    </div>
                )
            }
            else {
                quizCards = res.data.data.map((card, index) =>
                    <div className="question-card">
                        <div className="question-data">
                            <h2 className="sa-question">{card.question}</h2>
                        </div>
                        <input placeholder="Type your answer" className="sa-input" type="text" name={`question-${index}`} onChange={(e) => {
                            const newUserAnswers = [...userAnswers];
                            newUserAnswers[index] = { question: card.question, answer: e.target.value };
                            setUserAnswers(newUserAnswers);
                        }} />
                    </div>
                )
            }

            setQuizData(quizCards);
            setButtonData(newButtonData);
        }
        getRes();
    }, [id]);

    return (
        <div className="outer">
            <div className="header-div">
                <h1 className="header-title">Quiz</h1>
            </div>
            <div className="questions">
                {quizData}
            </div>
            {buttonData}
            <h3 className="error">{error}</h3>
        </div>
    )
}

export default Quiz;