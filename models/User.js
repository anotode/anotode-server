var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  // define user model here
})

module.exports = mongoose.Model('User', UserSchema)
