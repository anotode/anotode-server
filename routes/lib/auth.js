var jwt = require('jsonwebtoken')

// verify JWT token
// return user id on success
exports.verifyJWT = function (token) {
  return new Promise(function (resolve, reject) {
    if (!token) {
      return reject('No token found')
    }
    jwt.verify(token, 'SECRET', {}, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      var id = decoded._id
      return resolve(id)
    })
  })
}
