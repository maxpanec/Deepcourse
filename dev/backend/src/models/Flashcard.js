const mongoose = require("mongoose");
var QnA = require('./QnA');
var Score = require('./Score');


const FlashcardSchema = new mongoose.Schema({
    setName: {type: String, required: true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questions: {
        type: [QnA],
        validate: v => Array.isArray(v) && v.length > 0,
    },
    scores: [{
        type: Score,
        required: true,
    }],
});

const flashcardModel = mongoose.model("flashcard", FlashcardSchema);
module.exports = flashcardModel;