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
  // validate email and other things
  if (user.email === '' || (!helpers.validateEmail(user.email))) {
    return error(res, 'Invalid email or password')
  }
  if (user.password.length < 6) {
    return error(res, 'Password too short. Should be min 6 characters')
  }
  // set hash password
  user.password = helpers.hashPassword(user.password)
  // find if email/username exists
  User.find({'$or': [{'username': user.username}, {'email': user.email}]}, (err, users) => {
    if (err) {
      return error(res, err)
    }
    if (users.length === 0) {
      // save user if no user exists
      user.save(function (err) {
        if (err) {
          return error(res, err)
        }
        res.json(user)
      })
    } else {
      error(res, 'User already exists with same username/email')
    }
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

/*
 * Reset password (set new password)
 */
router.get('/reset_password', function (req, res, next) {
  auth.verifyJWT(req.query.token).then((id) => {
    // update password hash
    User.findById(id, function (err, user) {
      if (err) {
        return error(res, err)
      }
      user.password = helpers.hashPassword(req.query.newpwd)
      user.save(function (err) {
        if (err) {
          return error(res, err)
        }
        res.send('Success')
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
