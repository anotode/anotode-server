var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var got = require('got')
var helpers = require('./lib/helpers.js')
var error = helpers.makeError

var User = require('../models/User.js')

/*
 * Make User JWT
 */
function makeUserJWT (user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ _id: user._id }, 'SECRET', {}, (err, jwtToken) => {
      if (err) {
        return reject(err)
      }
      return resolve(jwtToken)
    })
  })
}

/*
 * Login the user and return JWT token
 */
router.post('/', function (req, res, next) {
  // hash the password
  var hashPassword = helpers.hashPassword(req.body.password)
  // find users
  User.find({ email: req.body.email, password: hashPassword }, function (err, users) {
    if (err) {
      return error(res, err)
    }
    // no user found
    if (users.length === 0) {
      return error(res, 'Wrong email or password')
    }
    // return user token
    makeUserJWT(users[0]).then((jwtToken) => {
      res.json({ token: jwtToken })
    }, (err) => {
      error(res, err)
    })
  })
})

/*
 * Forget password
 */
router.post('/forgot_password', function (req, res, next) {
  User.find({ email: req.body.email }, (err, users) => {
    if (err) {
      return error(res, err)
    }
    // no user found
    if (users.length === 0) {
      return error(res, 'No Account exists with that email')
    }
    // make forgot password link and send
    makeUserJWT(users[0]).then((jwtToken) => {
      // make random password
      var newPwd = Math.random().toString(36).substring(2, 7)
      console.log(newPwd)
      // send email
      got.post('https://api.sendgrid.com/api/mail.send.json', {
        body: {
          to: req.body.email,
          from: 'support@anotode.com',
          subject: 'Password Reset Link',
          html: 'Hi<br>Your new password is ' + newPwd + '<br>Visit the following link to confirm<br><br>' +
            'https://anotode.herokuapp.com/api/users/reset_password?token=' + jwtToken + '&newpwd=' + newPwd
        },
        json: true,
        headers: {
          'Authorization': 'Bearer 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'
        }
      }).then((response) => {
        res.json(response.body)
      }).catch((err) => {
        error(res, err.response.body)
      })
      // done sending email
    }, (err) => {
      error(res, err)
    })
  })
})

// Export the Router
module.exports = router
