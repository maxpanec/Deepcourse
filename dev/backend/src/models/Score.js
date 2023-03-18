const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    score: {type: Number, required: true},
    createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Score = ScoreSchema;
module.exports = Score;