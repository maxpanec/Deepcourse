const mongoose = require("mongoose");

//DB Schema for Flashcard Scores
const ScoreSchema = new mongoose.Schema({
    score: {type: Number, required: true},
    createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Score = ScoreSchema;
module.exports = Score;