var mongoose = require('mongoose')

var HighlightSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  title: String,
  text: String,
  url: String,
  category: String,
  color: Number,
  timeDate: Number,
  comment: String,
  tags: [ String ]
})

module.exports = mongoose.model('Highlight', HighlightSchema)
