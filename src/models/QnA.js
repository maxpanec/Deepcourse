const mongoose = require("mongoose");

//DB Schema for Flashcard Question and Answer Pairs
const QnASchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
});

const QnA = QnASchema;
module.exports = QnA;