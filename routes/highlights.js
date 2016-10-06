var express = require('express')
var router = express.Router()

var auth = require('./lib/auth.js')

var Highlight = require('../models/Highlight.js')

/*
 * GET user's highlights
 */
router.get('/', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    Highlight.find({ user_id: id }, (err, hls) => {
      if (err) {
        return next(err)
      }
      res.json(hls)
    })
  }, (err) => {
    res.status(400).json({ error: err })
  })
})

/*
 * Create new highlight
 */
router.post('/', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    var highlight = new Highlight(req.body)
    highlight.user_id = id
    highlight.save((err) => {
      if (err) {
        return next(err)
      }
      res.json(highlight)
    })
  }, (err) => {
    res.status(400).json({ error: err })
  })
})

/*
 * Delete a highlight
 */
router.delete('/:hid', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    var filterJson = { user_id: id, _id: req.params.hid }
    Highlight.findOneAndRemove(filterJson, (err) => {
      if (err) {
        return next(err)
      }
      res.send('Success')
    })
  }, (err) => {
    res.status(400).json({ error: err })
  })
})

/*
 * Update a highlight
 */
router.put('/:hid', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    var filterJson = { user_id: id, _id: req.params.hid }
    Highlight.findOneAndUpdate(filterJson, req.body, (err, post) => {
      if (err) {
        return next(err)
      }
      Highlight.findById(req.params.hid, (err, hl) => {
        if (err) {
          return next(err)
        }
        res.json(hl)
      })
    })
  }, (err) => {
    res.status(400).json({ error: err })
  })
})

// Export the Router
module.exports = router
