const mongoose = require("mongoose");
var QnA = require('./QnA');
var Score = require('./Score');

//DB Schema for Flashcards
const FlashcardSchema = new mongoose.Schema({
    setName: {type: String, required: true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cards: {
        type: [QnA],
        require: true,
        validate: v => Array.isArray(v) && v.length > 0,
    },
    scores: [{
        type: Score,
        required: true,
    }],
});

const Flashcard = mongoose.model("flashcard", FlashcardSchema);
module.exports = Flashcard;