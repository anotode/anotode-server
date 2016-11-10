var express = require('express')
var router = express.Router()

var auth = require('./lib/auth.js')
var error = require('./lib/helpers.js').makeError

var Highlight = require('../models/Highlight.js')

/*
 * GET user's highlights
 */
router.get('/', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    // make filter
    var filter = {user_id: id}
    if (req.query.url_eq) {
      filter['url'] = req.query.url_eq
    }
    if (req.query.text_contains) {
      filter['text'] = {'$regex': req.query.text_contains, '$options': 'i'}
    }
    // find
    Highlight.find(filter, (err, hls) => {
      if (err) {
        return error(res, err)
      }
      res.json(hls)
    })
  }, (err) => {
    error(res, err)
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
        return error(res, err)
      }
      res.json(highlight)
    })
  }, (err) => {
    error(res, err)
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
        return error(res, err)
      }
      res.send('Success')
    })
  }, (err) => {
    error(res, err)
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
        return error(res, err)
      }
      Highlight.findById(req.params.hid, (err, hl) => {
        if (err) {
          return error(res, err)
        }
        res.json(hl)
      })
    })
  }, (err) => {
    error(res, err)
  })
})

// Export the Router
module.exports = router
