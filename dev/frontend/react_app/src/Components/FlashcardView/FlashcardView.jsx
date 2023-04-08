import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

import "./FlashcardView.css";

//sample flashcard set for testing purposes
//currently loads data from the test object, not from the server
let sampleFlashcardSet = {
    //object holding the data for the study set
    "data": {
        //name of the study set
        "name": "Sample Study Set",
        //who made the study set
        "createdBy": "Test Set Creator",
        //array of objects with each object having keys question and answer representing 
        //the question and answer for an individual flashcard
        "cards": [
            {
                "question": "What is the name of our class?",
                "answer": "CS-161: Software Project"
            },
            {
                "question": "What color is the sky?",
                "answer": "Blue"
            },
            {
                "question": "Which university do we attend? And are you sure we attend there?",
                "answer": "San Jose State University. Yes, I am positive. you can ask any of my buddies."
            },
            {
                "question": "What year is it?",
                "answer": "2023"
            },
            {
                "question": "A deductive argument that has all true premises is ______",
                "answer": "Sound"
            },
            {
                "question": "How hot is the surface of the sun?",
                "answer": "10,340 degrees Fahrenheit"
            }
        ],
        "scores": []
    }
}



let flashcards = sampleFlashcardSet["data"]["cards"];

let cardData = flashcards.map((card) => 
    <div className="complete-card">
        <h2 class="question">{card["question"]}</h2>
        <h2 class="answer">{card["answer"]}</h2>
        </div>
);
const FlashcardView = (props) => {
    //gets id from url parameter
    const {id} = useParams();
    let res;
    const getRes = async () => {
        res = await axios.get("http://localhost:3001/flashcards/flashcard-set", {params: {id: id}});
        console.log("res: " + res)
    }
    let result = getRes();
    return(
        <div className="outer">
            <div className="title">
                <h1 class="set-title">{sampleFlashcardSet["data"]["name"]}</h1>
                <h2 className="creator">Created by: {sampleFlashcardSet["data"]["createdBy"]}</h2>
                <h2>ID: {id}</h2> {/* can be removed, only here for testing purposes */}
                <h2>Result: {result["message"]}</h2>
            </div>
            <div className="flashcard-grid">
                {cardData}
            </div>
        </div>

    );
};

export default FlashcardView