const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity")

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
    flashcardIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flashcard",
        required: false,
    }],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({_id: this._id}, 'jwt_token', {expiresIn: '7d'})
	return token
}

const User = mongoose.model("users", UserSchema);

const validate = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password")
	})
	return schema.validate(data)
}


module.exports = {User, validate}