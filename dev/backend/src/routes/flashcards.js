const router = require("express").Router();
const {User} = require("../models/User")
const Flashcard = require("../models/Flashcard")

// BASE URL FOR TESTING API ENDPOINTS http://localhost:3001/flashcards/

/*
    Expected Format of req.body
    {
        //username of the user creating the set
        "username":String,
        //name for the study set
        "setName":String,
        //array of objects with each object having keys question and answer representing 
        //the question and answer for an individual flashcard
        //this example only contains two question answer pairs but the number can be any number 1 or greater
        "cards": [
            {
                "question":String,
                "answer":String
            },
            {
                "question":String,
                "answer":String
            }
        ]
    }
*/
router.post("/flashcard-set", async(req,res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user)
            return res.status(401).json({message: "Invalid Username"})
        
        const set = new Flashcard({...req.body, createdBy: user._id})
        try{
            await set.save();
        }
        catch(err){
            return res.status(400).json({message: "Invalid flashcard data"})
        }
        user.flashcardIDs.push(set._id)
        await user.save();

        res.status(201).json()
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.put("/flashcard-set", async(req,res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user)
            return res.status(401).json({message: "Invalid Username"})

        const set = await Flashcard.findById(req.body.cardID)
        if(!set)
            return res.status(401).json({message: "Invalid ID"})

        try{
            set.cards = req.body.cards
            set.setName = req.body.setName
            await set.save()
        }
        catch(err){
            return res.status(400).json({message: "Invalid flashcard data"})
        }
        
        res.status(200).json()
    }  catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected return of json data
    {
        //array of objects with keys name and id
        //name is the name of the study set
        //id is the object id of the study set (used to retrieve data from a single study set)
        //the amount of elements in data will be 0 or more
        "data": [
            {
                "name": String,
                "id": String
            },
            {
                "name": String,
                "id": String
            }
        ]
    }

    Expected paramters
    //the username for the user you want the list of study sets from
    username
*/
router.get("/flashcard-sets-info", async(req,res) => {
    try {
        const username = req.query.username
        if(username == null)
            return res.status(400).json({message: "Missing username paratmeter"})

        const user = await User.findOne({username: username})
        if (!user)
            return res.status(401).json({message: "Invalid Username"})

        const flashcardNames = []
        for(let i = 0; i < user.flashcardIDs.length; i++){
            const set = await Flashcard.findById(user.flashcardIDs[i]._id)
            flashcardNames.push({
                name: set.setName,
                id: set._id
            })
        }
                
        res.status(200).json({data: flashcardNames})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected return of json data
    {
        //object holding the data for the study set
        "data": {
            //name of the study set
            "name": "test set",
            //who made the study set
            "createdBy": "maxtest",
            //array of objects with each object having keys question and answer representing 
            //the question and answer for an individual flashcard
            //this example only contains two question answer pairs but the number can be any number 1 or greater
            "cards": [
                {
                    "question": "Q1",
                    "answer": "A1"
                },
                {
                    "question": "Q2",
                    "answer": "A2"
                }
            ],
            "scores": []
        }
    }

    Expected paramters
    //the object id of the flashcard set
    id
*/
router.get("/flashcard-set", async(req,res) => {
    try {
        const id = req.query.id
        if(id == null)
            return res.status(400).json({message: "Missing ID paratmeter"})

        var set;
        try{
            set = await Flashcard.findById(id)
        }
        catch(err){
            return res.status(401).json({message: "Invalid ID"})
        }

        const user = await User.findById(set.createdBy._id)

        const QnAs = []
        set.cards.forEach(qna => {
            QnAs.push({
                question: qna.question,
                answer: qna.answer
            })
        })

        const setData = {
            name: set.setName,
            createdBy: user.username,
            cards: QnAs,
            scores: [],
        }
                
        res.status(200).json({data: setData})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected paramters
    //the username of the user who owns this set
    username
    //the id of the flashcard to be deleted
    id
*/
router.delete("/flashcard-set", async(req,res) => {
    try {
        const user = await User.findOne({username: req.query.username})
        if (!user)
            return res.status(401).json({message: "Invalid Username"})

        const id = req.query.id
        const set = await Flashcard.findById(id)
        if (!set)
            return res.status(401).json({message: "Invalid ID"})

        await user.flashcardIDs.pull(id)

        await set.delete()
        await user.save()

        res.status(200).json()
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

// router.delete("/sets", async(req,res) => {
//     try {
//         const user = await User.findOne({username: req.body.username})
//         console.log(user)
//         const ids = user.flashcardIDs
//         for(let i = 0; i < ids.length; i++){
//             const set = await Flashcard.findById(ids[i]._id)
//             console.log(set)
//             set.delete()
//         }
//         ids.forEach(id => {
//             user.flashcardIDs.pull(id._id)
//         })
//         user.save()
//         console.log(user)

//         res.status(200).json()
//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error"})
//     }
// })

// router.get("/flashcard-sets-all", async(req,res) => {
//     try {
//         const sets = await Flashcard.find({})

//         sets.forEach(set => {
//             console.log(set)
//             set.delete()
//         })
                
//         res.status(200).json()
//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error"})
//     }
// })

module.exports = router;