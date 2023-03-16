const router = require("express").Router();
const {User, validate} = require("../models/User")
const Joi = require('joi');
const bcrypt = require("bcrypt")
const passwordComplexity = require("joi-password-complexity")

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

router.post("/forget-password", async (req, res) => {
    try{
        const email = await User.findOne({email: req.body.email})
        if (!email)
            return res.status(401).json({message: "Invalid Email!"})

        if((req.body.username).localeCompare(email.username))
            return res.status(401).json({message: "Invalid Username!"})

        return res.status(201).json({message: "Found Valid Username!"})
    } catch (error) {
        res.status(500).json({message: "Internnal Server Error!!!"})
    }
})

router.post("/forget-password/reset-password", async (req, res) => {
    try{
        let password = req.body.password
        let confirmed = req.body.confirmed_password

        const user = await User.findOne({email: req.body.email})
        if(!user)
            return res.status(401).json({message: "Oops. Something went wrong!"})

        if(password.localeCompare(confirmed))
            return res.status(402).json({message: "Password does not match!"})

        await user.remove();

        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        let newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        }).save()
        return res.status(201).json({data: newUser, message: "Password Successfully Reset!"})
    } catch (error) {
        res.status(500).json({message: "Internnal Server Error!!!"})
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