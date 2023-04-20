const router = require("express").Router();
const {User} = require("../models/User")
const Flashcard = require("../models/Flashcard")

// BASE URL FOR TESTING API ENDPOINTS http://localhost:3001/quiz/

/*
    Expected Format of req.body
    //the id of the flashcard to be deleted
    id
    //the score to be saved (must be between 0 and 100)
    score
*/
router.put("/score", async(req,res) => {
    try {
        const set = await Flashcard.findById(req.body.id)
        if (!set)
            return res.status(401).json({message: "Invalid ID"})
        
        const score = parseInt(req.body.score)

        if(isNaN(score) || score < 0 || score > 100)
            return res.status(401).json({message: "Invalid Score"})
        set.scores.push({score: req.body.score})

        await set.save()

        res.status(200).json()
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected return of json data
    {
        //array of objects with keys score and date
        //each element represents the results of a submitted quiz
        //score is the score for the quiz
        //date is when the quiz was submitted
        //the amount of elements in data will be 0 or more
        "data": [
            {
                "score": String,
                "date": String
            }
        ]
    }

    Expected paramters
    //the id of the flashcard set you want to retrieve the scores for
    id
*/
router.get("/scores", async(req,res) => {
    try {
        const set = await Flashcard.findById(req.query.id)
        if (!set)
            return res.status(401).json({message: "Invalid ID"})
        
        const scores = set.scores
        const retScores = []

        scores.forEach((score) => {
            retScores.push({
                score: score.score,
                date: score.createdAt
            })
        })

        res.status(200).json({data: retScores})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected return of json data
    {
        //array of objects with keys question, choices, and answer
        //each element represents a quiz question/answer
        //question is the question
        //choices is an array of the different choices the user has for the question
        //answer is the correct choice
        //the amount of elements in data will be 0 or more
        "data": [
            {
                "question": String,
                "choices": [String],
                "answer": String
            }
        ]
    }

    Expected paramters
    //the id of flashcard set you want to take a quiz for
    id
    //the type of quiz you want to take (MUST BE ONE OF THE FOLLOWING: ToF, MC, or SA)
    type
*/
router.get("/quiz", async(req,res) => {
    try {
        const set = await Flashcard.findById(req.query.id)
        if (!set)
            return res.status(401).json({message: "Invalid ID"})
        
        if(set.cards.length < 4){
            return res.status(204).json({message: "Set Has Less Than 4 Items"})
        }

        const type = req.query.type
        if(type !== "ToF" && type !== "MC" && type !== "SA")
            return res.status(401).json({message: "Invalid Type"})
        
        let data = []
        if(type === "ToF")
            data = getTrueOrFalseData(set)
        else if(type === "MC")
            data = getMultipleChoiceData(set)
        else if(type === "SA")
            data = getShortAnswerData(set)

        res.status(200).json({data: data})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})

function getShortAnswerData(set){
    const retArr = []
    set.cards.forEach((card) => {
        retArr.push({
            question: card.question,
            choices: [],
            answer: card.answer
        })
    })
    return retArr
}

function getTrueOrFalseData(set){
    const retArr = []

    const randomTrueOrFalse = () => {
        return Math.floor(Math.random() * 2) == 0
    }
    const getRandomDifferentAnswer = (arr, self) => {
        let randomInt = self
        while(randomInt == self){
            randomInt = Math.floor(Math.random() * arr.length)
        }
        return arr[randomInt].answer
    }

    for(let i = 0; i < set.cards.length; i++){
        const tof = randomTrueOrFalse()
        const questionPart = tof ? set.cards[i].answer : getRandomDifferentAnswer(set.cards, i)
        const question = set.cards[i].question + " : " + questionPart
        const answer = tof ? "True" : "False"
        retArr.push({
            question: question,
            choices: ["True", "False"],
            answer: answer
        })
    }
    return retArr
}

function getMultipleChoiceData(set){
    const retArr = []

    const getChoices = (arr, self) => {
        const choicesNums = []
        while(choicesNums.length != 3){
            randomInt = Math.floor(Math.random() * arr.length)
            if(randomInt == self || choicesNums.includes(randomInt))
                continue
                choicesNums.push(randomInt)
        }
        choicesNums.splice(Math.floor(Math.random() * 4), 0, self)

        const choices = []
        choicesNums.forEach((num) => {
            choices.push(arr[num].answer)
        })

        return choices
    }

    for(let i = 0; i < set.cards.length; i++){
        retArr.push({
            question: set.cards[i].question,
            choices: getChoices(set.cards, i),
            answer: set.cards[i].answer
        })
    }
    return retArr
}

module.exports = router;