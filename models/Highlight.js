// Imports data from the user
var mongoose = require('mongoose')

var Highlight = new mongoose.Schema({
  user_id: { type: String, unique: true },
  title: String,
  text: String,
  url: String,
  timeDate: Number,
  color: Number,
  comment: String,
  tags: [ tag ]
})

var tag = new mongoose.Schema({
  name: {type: String, unique: true}
})

module.exports = mongoose.model('User', Highlight)
