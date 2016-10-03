/*
 * This file contains helper functions for routes.
 * That's all
 */
var crypto = require('crypto')

var self = this

/*
 * Send error response
 */
self.errorResponse = function (text, code) {
  code = typeof code !== 'undefined' ? code : 400

  return {
    message: text,
    code: code
  }
}

/*
 * Hash password
 */
self.hashPassword = function (password) {
  var hashPassword = crypto.createHash('sha1')
  hashPassword.update(password)
  return hashPassword.digest('hex')
}

// Export everything
module.exports = self
