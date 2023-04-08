import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import "./FlashcardView.css";

const FlashcardView = (props) => {
  const { id } = useParams();
  const [cardData, setCardData] = useState([]);
  const [titleData, setTitleData] = useState("");
  let res;

  useEffect(() => {
    const getRes = async () => {
        res = await axios.get("http://localhost:3001/flashcards/flashcard-set", {params: {id: id}});
        console.log("name: " + res.data.data.name); 
        let flashcards = res.data.data.cards;
        let title = (<div className="view-set-title">
            <h1 className="set-title">{res.data.data.name}</h1>
            <h2 className="creator">Created by: {res.data.data.createdBy}</h2>
        </div>)
        setTitleData(title);
        let cards = flashcards.map((card) => 
          <div className="complete-card">
            <h2 class="question">{card["question"]}</h2>
            <h2 class="answer">{card["answer"]}</h2>
          </div>
        );
        setCardData(cards);
      }
    getRes();
  }, [id]);

  return(
    <div className="outer">
        {titleData}
      <div className="flashcard-grid">
        {cardData}
      </div>
    </div>
  );
};

export default FlashcardView;