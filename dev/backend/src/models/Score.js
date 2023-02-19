const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
    score: {type: Number, required: true},
    createdAt: {
		type: Date,
		default: Date.now,
	},
});

const scoreModel = mongoose.model("score", ScoreSchema);
module.exports = scoreModel;