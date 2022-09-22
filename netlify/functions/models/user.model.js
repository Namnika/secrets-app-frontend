const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  id: String,
  email:
  {
    type: String,
    required: true,
    unique: true
  },
  password:
  {
    type: String,
    required: true
  }
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "username"});
module.exports = User = mongoose.model("users", UserSchema);
