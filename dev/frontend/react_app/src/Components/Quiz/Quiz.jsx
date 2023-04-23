import React from "react";
import "./Quiz.css"

const sampleDataTOF = {
    "data": {
        "name": "Test Set",
        "createdBy": "Mr. Test",
        "cards": [
            {
                "question": "What is the color of the sun?",
                "answer": "Yellow"
            },
            {
                "question": "What is the color of the sky?",
                "answer": "Blue"
            },
            {
                "question": "What is the color of the American flag?",
                "answer": "Red, white, and blue"
            },
            {
                "question": "What is the color of grass?",
                "answer": "Green"
            }
        ]
    }
}


const flashcardsTOF = sampleDataTOF.data.cards;

let bodyTOF = flashcardsTOF.map((card) =>
    <div className="question-card">
        <div className="question-data">
            <div className="question-q">
                <h2>{card.question}</h2>
            </div>
            <div className="question-a">
                <h2>{card.answer}</h2>
            </div>
        </div>
        <button className="true-button">True</button>
        <button className="false-button">False</button>
    </div>
)

let bodyMC = flashcardsTOF.map((card) =>
    <div className="question-card">
        <div className="question-data">
            <h2 className="mc-question">{card.question}</h2>
        </div>
        <button className="true-button">{flashcardsTOF[0].answer}</button>
        <button className="true-button">{flashcardsTOF[1].answer}</button>
        <button className="true-button">{flashcardsTOF[2].answer}</button>
        <button className="true-button">{flashcardsTOF[3].answer}</button>
    </div>
)

const Quiz = () => {
    return (
        <div className="outer">
            <div className="header-div">
                <h1 className="header-title">{sampleDataTOF.data.name} Quiz</h1>
            </div>
            <div className="questions">
                {/* {bodyTOF} */}
                {bodyMC}
            </div>
        </div>
    )
}

export default Quiz;