var express = require('express')
var router = express.Router()
var crypto = require('crypto')

var User = require('../models/User.js')

/*
 * GET Users Listing
 */
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err)
    }
    res.json(users)
  })
})

/*
 * Create new user
 */
router.post('/', function (req, res, next) {
  var user = new User(req.body)
  // set default username
  if (!req.body.username) {
    user.username = user.email
  }
  // set hash password
  var hashPassword = crypto.createHash('sha1')
  hashPassword.update(user.password)
  user.password = hashPassword.digest('hex')
  // save user
  user.save(function (err) {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
})

/*
 * GET single user
 */
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
})

// TODO: Implement Delete API
// May require deleting highlights to be done manually

// Export the Router
module.exports = router
