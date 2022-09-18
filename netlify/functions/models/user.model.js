const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.plugin(passportLocalMongoose, {usernameField: "username"});
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
