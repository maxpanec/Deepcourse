const router = require("express").Router();
const {User, validate} = require("../models/User")
const Joi = require('joi');
const bcrypt = require("bcrypt")

router.post("/signin", async(req,res) => {
    try {
        const user = await User.findOne(
            {$or: [{ email: req.body.username_email }, { username: req.body.username_email }]}
        )
        if (!user)
            return res.status(401).json({message: "Invalid Email/Username or Password!"})

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(401).json({message: "Invalid Email/Username or Password!"})

        const token = user.generateAuthToken()
        res.status(200).json({data: user, token})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error!!!"})
    }
})

router.post("/signup", async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).json({message: error.details[0].message})

        const userEmail = await User.findOne({email: req.body.email})
        if (userEmail)
            return res.status(409).json({message: "User with given email already exists!"})
        
        const userUsername = await User.findOne({username: req.body.username})
        if (userUsername)
            return res.status(409).json({message: "User with given username already exists!"})

        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        let newUser = await new User({...req.body, password: hashPassword}).save()
        res.status(201).json({data: newUser, message: "User created successfully!"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error!!!"})
    }
})

module.exports = router;