/*
 * This file contains helper functions for routes.
 * That's all
 */
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var got = require('got')

/*
 * Hash password
 */
exports.hashPassword = function (password) {
  var hashPassword = crypto.createHash('sha1')
  hashPassword.update(password)
  return hashPassword.digest('hex')
}

/*
 * Return error response
 */
exports.makeError = function (res, error) {
  return res.status(400).json({ error: error })
}

/*
 * Validate email
 * http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
 */
exports.validateEmail = function (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/*
 * Validate username
 */
exports.validateUsername = function (username) {
  var re = /^[\S]+$/
  return re.test(username)
}

/*
 * Make JWT
 */
exports.makeJwtToken = (obj) => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, 'SECRET', {}, (err, jwtToken) => {
      if (err) {
        return reject(err)
      }
      return resolve(jwtToken)
    })
  })
}

/*
 * Decode JWT
 */
exports.breakJwtToken = function (token) {
  return new Promise(function (resolve, reject) {
    if (!token) {
      return reject('Not a valid url')
    }
    jwt.verify(token, 'SECRET', {}, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      return resolve(decoded)
    })
  })
}

/*
 * Send Email
 */
exports.sendEmail = function (obj) {
  return new Promise(function (resolve, reject) {
    got.post('https://api.sendgrid.com/api/mail.send.json', {
      body: {
        to: obj.email,
        from: 'support@anotode.com',
        subject: obj.subject,
        html: obj.html
      },
      json: true,
      headers: {
        'Authorization': 'Bearer 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'
      }
    }).then((response) => {
      resolve(response.body)
    }).catch((err) => {
      reject(err.response.body)
    })
  })
}
