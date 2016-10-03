var mongoose = require('mongoose')

var HighlightSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  text: String,
  url: String,
  category: String,
  color: String,
  timeDate: Number,
  comment: String,
  tags: [ String ]
})

module.exports = mongoose.model('Highlight', HighlightSchema)
