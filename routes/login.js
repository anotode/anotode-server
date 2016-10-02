var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var helpers = require('./lib/helpers.js')

var User = require('../models/User.js')

/*
 * Login the user and return JWT token
 */
router.post('/', function (req, res, next) {
  // hash the password
  var hashPassword = crypto.createHash('sha1').update(req.body.password).digest('hex')
  // find users
  User.find({ email: req.body.email, password: hashPassword }, function (err, users) {
    if (err) {
      return next(err)
    }
    // no user found
    if (users.length == 0) {
      res.status(400)
      return res.json(helpers.errorResponse('Wrong email or password'))
    }
    // return user token
    user = users[0]
    token = jwt.sign({ _id: user._id }, 'SECRET', {}, function (err, token) {
      if (err) {
        return next(err)
      }
      // TODO: set session var for web app
      res.json({ token: token })
    })
  })
})

// Export the Router
module.exports = router
