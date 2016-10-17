var express = require('express')
var router = express.Router()

var auth = require('./lib/auth.js')
var helpers = require('./lib/helpers.js')
var error = helpers.makeError

var User = require('../models/User.js')

/*
 * GET Users Listing
 */
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return error(res, err)
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
  user.password = helpers.hashPassword(user.password)
  // save user
  user.save(function (err) {
    if (err) {
      return error(res, err)
    }
    res.json(user)
  })
})

/*
 * GET single user
 */
router.get('/user', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    User.findById(id, function (err, user) {
      if (err) {
        return error(res, err)
      }
      res.json(user)
    })
  }, (err) => {
    error(res, err)
  })
})

/*
 * UPDATE single user
 */
router.put('/user', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    User.findByIdAndUpdate(id, req.body, function (err, post) {
      if (err) {
        return error(res, err)
      }
      // update password hash
      User.findById(id, function (err, user) {
        if (err) {
          return error(res, err)
        }
        user.password = helpers.hashPassword(user.password)
        user.save(function (err) {
          if (err) {
            return error(res, err)
          }
          res.json(user)
        })
      })
    })
  }, (err) => {
    error(res, err)
  })
})

// TODO: Implement Delete API
// May require deleting highlights to be done manually

// Export the Router
module.exports = router
