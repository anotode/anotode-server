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
