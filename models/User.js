const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    require: true,
    minLength: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("User", userSchema)