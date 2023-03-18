const router = require("express").Router();
const {User, validate} = require("../models/User")
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity")
const bcrypt = require("bcrypt")

router.post("/signin", async(req,res) => {
    try {
        const user = await User.findOne(
            {$or: [{ email: req.body.username_email }, { username: req.body.username_email }]}
        )
        console.log(user)
        if (!user)
            return res.status(401).json({message: "Invalid Email/Username or Password"})

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(401).json({message: "Invalid Email/Username or Password"})

        //const token = user.generateAuthToken()
        const userData = {
            username: user.username
        }
        res.status(200).json({data: userData})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.post("/signup", async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error)
            return res.status(400).json({message: error.details[0].message})

        const userEmail = await User.findOne({email: req.body.email})
        if (userEmail)
            return res.status(409).json({message: "User with given email already exists"})
        
        const userUsername = await User.findOne({username: req.body.username})
        if (userUsername)
            return res.status(409).json({message: "User with given username already exists"})

        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({...req.body, password: hashPassword}).save()
        res.status(201).json()

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.put("/password", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user)
            return res.status(401).json({message: "Invalid Email"})
        
        const {error} = validatePassword({password: req.body.password})
        if (error)
            return res.status(400).json({message: error.details[0].message})
        
        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashPassword;
        await user.save();

        res.status(201).json({message: "User password updated"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

router.put("/username", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user)
            return res.status(401).json({message: "Invalid Email"})
        
        const {error} = validateUsername({username: req.body.username})
        if (error)
            return res.status(400).json({message: error.details[0].message})
            
        user.username = req.body.username
        await user.save();

        res.status(201).json({message: "User username updated"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

// router.delete("/deleteuser", async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email})
//         if (!user)
//             return res.status(401).json({message: "Invalid Email"})
        
//         user.delete();

//         res.status(200).json({message: "User has been deleted"})

//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error"})
//     }
// })

// router.get("/users", async (req, res) => {
//     try {
//         const users = await User.find({})

//         const userList = []
//         users.forEach(user => {
//             userList.push(
//                 {
//                     email: user.email,
//                     username: user.username,
//                 }
//             )
//         });

//         res.status(200).json({data: userList})

//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error"})
//     }
// })

const validatePassword = (data) => {
	const schema = Joi.object({
		password: passwordComplexity().required().label("Password")
	})
	return schema.validate(data)
}

const validateUsername = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(3).max(16).required().label("Username"),
	})
	return schema.validate(data)
}

module.exports = router;