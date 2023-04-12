const router = require("express").Router();
const {User, validate} = require("../models/User")
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity")
const bcrypt = require("bcrypt")

// BASE URL FOR TESTING API ENDPOINTS http://localhost:3001/accounts/

/*
    Expected Format of req.body
    {
        //username or email for the user
        "username_email":String,
        //password of the user
        "password":String,
    }
*/
router.post("/signin", async(req,res) => {
    try {
        const user = await User.findOne(
            {$or: [{ email: req.body.username_email }, { username: req.body.username_email }]}
        )
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

/*
    Expected Format of req.body
    {
        //email for the user
        "email":String,
        //username of the user
        "username":String,
    }
*/
router.post("/forget-password", async (req, res) => {
    try{
        const email = await User.findOne({email: req.body.email})
        if (!email)
            return res.status(401).json({message: "Invalid Email!"})

        if((req.body.username).localeCompare(email.username))
            return res.status(401).json({message: "Invalid Username"})

        return res.status(201).json({message: "Found Valid Username"})
    } catch (error) {
        res.status(500).json({message: "Internnal Server Error"})
    }
})

/*
    Expected Format of req.body
    {
        //email for the user
        "email":String,
        //new password for user
        "password":String,
        //confirmation of new password for user
        "confirmed_password":String,
    }
*/
router.post("/forget-password/reset", async (req, res) => {
    try{
        let password = req.body.password
        let confirmed = req.body.confirmed_password

        const user = await User.findOne({email: req.body.email})
        if(!user)
            return res.status(401).json({message: "Oops. Something went wrong!"})

        if(password.localeCompare(confirmed))
            return res.status(402).json({message: "Password does not match!"})

        const {error} = validatePassword({password: req.body.password})
        if (error)
            return res.status(400).json({message: error.details[0].message})
            
        const salt = await bcrypt.genSalt(Number(10))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
    
        user.password = hashPassword;
        await user.save();
    
        res.status(201).json({message: "User password updated"})
    } catch (error) {
        res.status(500).json({message: "Internnal Server Error"})
    }
})

/*
    Expected Format of req.body
    {
        //email for the user
        "email":String,
    }
*/
router.post("/forget-username", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user)
            return res.status(401).json({message: "Invalid Email"})
        
        return res.status(201).json({message: "Found Valid Email"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected Format of req.body
    {
        //email for the user
        "email":String,
        //new username for user
        "username":String,
    }
*/
router.post("/forget-username/reset", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if (!user)
            return res.status(401).json({message: "Oops, something went wrong"}) 
        
        const {error} = validateUsername({username: req.body.username})
        if (error)
            return res.status(400).json({message: error.details[0].message})
                
        user.username = req.body.username
        await user.save();
        
        const userData = {
            username: user.username
        }

        res.status(201).json({message: "User username updated", data: userData})
    }
    catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

/*
    Expected Format of req.body
    {
        //username for the new user
        "username":String,
        //email for the new user
        "email":String,
        //password for the new user
        "password":String,
    }
*/
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

        const user = await new User({...req.body, password: hashPassword}).save()

        const userData = {
            username: user.username
        }
        
        res.status(201).json({data: userData})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

// router.put("/password", async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email})
//         if (!user)
//             return res.status(401).json({message: "Invalid Email"})
        
//         const {error} = validatePassword({password: req.body.password})
//         if (error)
//             return res.status(400).json({message: error.details[0].message})
        
//         const salt = await bcrypt.genSalt(Number(10))
//         const hashPassword = await bcrypt.hash(req.body.password, salt)

//         user.password = hashPassword;
//         await user.save();

//         res.status(201).json({message: "User password updated"})

//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error"})
//     }
// })

// router.put("/username", async (req, res) => {
//     try {
//         const user = await User.findOne({email: req.body.email})
//         if (!user)
//             return res.status(401).json({message: "Invalid Email"})
        
//         const {error} = validateUsername({username: req.body.username})
//         if (error)
//             return res.status(400).json({message: error.details[0].message})
            
//         user.username = req.body.username
//         await user.save();

//         res.status(201).json({message: "User username updated"})

//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error"})
//     }
// })

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