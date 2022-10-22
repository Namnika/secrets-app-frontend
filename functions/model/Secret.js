const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema(
  {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  secret: {
    type: String,
  }
});

module.exports = mongoose.model("Secret", secretSchema);