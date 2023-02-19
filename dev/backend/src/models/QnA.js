const mongoose = require("mongoose");

const QnASchema = new mongoose.Schema({
    // 1: text question
    // 2: img (path for img) question
    qType: {
        type: Number,
        min: 1,
        max: 2,
        required: true
    },
    question: {type: String, required: true},
    answer: {type: String, required: true},
});

const qnaModel = mongoose.model("qna", QnASchema);
module.exports = qnaModel;