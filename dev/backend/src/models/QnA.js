const mongoose = require("mongoose");

const QnASchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
});

const QnA = QnASchema;
module.exports = QnA;