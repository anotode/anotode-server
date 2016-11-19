/*
 * This file contains helper functions for routes.
 * That's all
 */
var crypto = require('crypto')

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
