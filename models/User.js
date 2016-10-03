var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: String,
  picture_url: String
})

module.exports = mongoose.model('User', UserSchema)
