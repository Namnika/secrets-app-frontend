const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
	email: {
		type: String
	},
	username: String,
	roles: {
		User: {
			type: Number,
			default: 2001
		},
		Editor: Number,
		Admin:  Number
	},
	password: {
		type: String
	},
	refreshToken: String, 
	googleId: String,
	facebookId: String,
	githubId: String,
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema)
