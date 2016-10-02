/*
 * This file contains helper functions for routes.
 * That's all
 */

var self = this;

/*
 * Send error response
 */
self.errorResponse = function (text, code) {
  code = typeof code !== 'undefined' ? code : 400;

  return {
    message: text,
    code: code
  }
}


module.exports = self
