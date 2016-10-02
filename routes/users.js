var express = require('express')
var router = express.Router()

var helpers = require('./lib/helpers.js')

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
  user.password = helpers.hashPassword(user.password)
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

/*
 * UPDATE single user
 */
router.put('/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      return next(err)
    }
    // update password hash
    User.findById(req.params.id, function (err, user) {
      if (err) {
        return next(err)
      }
      user.password = helpers.hashPassword(user.password)
      user.save(function (err) {
        if (err) {
          return next(err)
        }
        res.json(user)
      })
    })
  })
})

// TODO: Implement Delete API
// May require deleting highlights to be done manually

// Export the Router
module.exports = router
