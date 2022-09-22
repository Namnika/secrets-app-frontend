const mongoose = require("mongoose");

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

module.exports = User = mongoose.model("users", UserSchema);
