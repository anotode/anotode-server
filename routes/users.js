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
  // validate username
  if (!helpers.validateUsername(user.username)) {
    return error(res, 'Invalid username. Should not contain whitespace')
  }
  // validate email and other things
  if (user.email === '' || (!helpers.validateEmail(user.email))) {
    return error(res, 'Invalid email')
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
      // create user acount simply
      if (req.query.noemail) {
        user.save(function (err) {
          if (err) {
            return error(res, err)
          }
          res.json(user)
        })
        return
      }
      // send user account creation email
      helpers.makeJwtToken({
        username: user.username,
        email: user.email,
        password: user.password
      }).then((jwtToken) => {
        helpers.sendEmail({
          email: user.email,
          subject: 'Anotode account creation',
          html: 'Visit the following link to create your account<br><br>' +
            'http://anotode.herokuapp.com/api/users/create_account?token=' + jwtToken
        }).then((response) => {
          res.json({'message': 'Email sent to create account. Please check your inbox'})
        }, (err) => {
          return error(res, err)
        })
      }, (err) => {
        return error(res, err)
      })
      // end good user create
    } else {
      error(res, 'User already exists with same username/email')
    }
  })
})

/*
 * Create Account from mail verify link
 */
router.get('/create_account', function (req, res, next) {
  helpers.breakJwtToken(req.query.token).then((obj) => {
    // find if email/username exists
    User.find({'$or': [{'username': obj.username}, {'email': obj.email}]}, (err, users) => {
      if (err) {
        return error(res, err)
      }
      if (users.length !== 0) {
        return error(res, 'User already exists')
      }
      // user not exist
      var user = new User(obj)
      user.save((err) => {
        if (err) {
          return error(res, err)
        }
        res.send('Success. Now you can login')
      })
    })
  }, (err) => {
    return error(res, err)
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
