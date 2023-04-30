import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios"
import "./FlashcardView.css";

const FlashcardView = (props) => {
  const { id } = useParams();
  const [cardData, setCardData] = useState([]);
  const [titleData, setTitleData] = useState("");
  const [isFrontSide, setIsFrontSide] = useState(true);
  const [termLabel, setTermLabel] = useState("Question");
  const [QnAs, setQnAs] = useState(null);
  const [position, setPosition] = useState(0);
  const [frontCardText, setFrontCardText] = useState("");
  const [backCardText, setBackCardText] = useState("");
  const [isTableFormat, setIsTableFormat] = useState(false);

  const nav = useNavigate();

  //get flashcard set's data and store in state
  //also generate table view mode
  useEffect(() => {
    const getRes = async () => {
        const res = await axios.get("http://localhost:3001/flashcards/flashcard-set", {params: {id: id}});
        let flashcards = res.data.data.cards;
        let title = (<div className="view-set-title">
            <h1 className="set-title">{res.data.data.name}</h1>
            <h2 className="creator">Created by: {res.data.data.createdBy}</h2>
        </div>)
        setTitleData(title);
        let key = 0;
        let cards = flashcards.map((card) =>
          <FlashCardTableCard 
            key={key++}
            question={card["question"]}
            answer={card["answer"]}
          /> 
        );
        setQnAs(flashcards);
        setFrontCardText(flashcards[0]["question"]);
        setBackCardText(flashcards[0]["answer"]);
        setCardData(cards);
      }
    getRes();
  }, [id]);

  //update deck mode with next card
  const nextCard = () => {
    if(position >= QnAs.length - 1)
      return;
    const q = QnAs[position+1]["question"]
    const a = QnAs[position+1]["answer"]
    setFrontCardText(isFrontSide ? q : a)
    setBackCardText(!isFrontSide ? q : a)
    setPosition(position+1);
    setTermLabel("Question")
  }

  //update deck mode with previous card
  const prevCard = () => {
    if(position <= 0)
      return;
      const q = QnAs[position-1]["question"]
      const a = QnAs[position-1]["answer"]
      setFrontCardText(isFrontSide ? q : a)
      setBackCardText(!isFrontSide ? q : a)
      setPosition(position-1);
      setTermLabel("Question")
  }

  //flip to other side (question or answer) in deck mode
  const flip = () => {
    setIsFrontSide(!isFrontSide)
    if(termLabel === "Question")
      setTermLabel("Answer")
    else
      setTermLabel("Question")
  }

  //navigate to edit flashcard page
  const handleEdit = () => {
    nav("edit");
  }

  return(
    <div className="outer">
      {/* title of the set */}
      {titleData}

      {/* buttons for choosing mode and editting */}
      {titleData !== "" && 
      <Stack direction="row" spacing={2} className="button-container">
        <Button variant="contained" color="primary" onClick={() => {setIsTableFormat(true)}}>Table</Button>
        <Button variant="contained" color="primary" onClick={() => {setIsTableFormat(false)}}>Deck</Button>
        <Button variant="contained" color="primary" onClick={() => handleEdit()}>Edit</Button>
      </Stack>}

      {/* table mode content */}
      {isTableFormat &&
      <div className="flashcard-grid">
        {cardData}
      </div>}

      {/* deck mode content */}
      {QnAs != null && !isTableFormat &&
      <div style={{textAlign: "center"}}>
        <h3 style={{marginTop: "4px", marginBottom: "4px"}}>{termLabel}</h3>
        <div className="deck-container ">
          <ArrowBackIosNewIcon className="deck-arrow" onClick={prevCard}/>
            <div className="deck" onClick={flip}>
              <div className={"frontCard" + (!isFrontSide ? " flipped" : "")}><h2>{frontCardText}</h2></div>
              <div className={"backCard" + (isFrontSide ? " flipped" : "")}><h2>{backCardText}</h2></div>
            </div>
          <ArrowForwardIosIcon className="deck-arrow" onClick={nextCard}/>
        </div>
      </div>}
    </div>
  );
};

//JSX Component for the card showing in deckmode
const FlashCardTableCard = (props) => {
  return(
    <div className="complete-card">
      <h2 className="question">{props.question}</h2>
      <h2 className="answer">{props.answer}</h2>
    </div>
  );
}

export default FlashcardView;