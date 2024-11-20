const mongoose = require("mongoose");
const {model} =require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String,required: true },

});
const User =model("User", userSchema)
module.exports = User;
