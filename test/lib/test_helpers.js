// creates a user using API
exports.createUser = function (chai, server) {
  return new Promise(function (resolve, reject) {
    var user = {
      email: 'aviaryan@git.com',
      password: 'password'
    }
    chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        if (err) {
          reject(res)
        } else {
          resolve(res)
        }
      })
  })
}

// login user
exports.loginUser = function (chai, server, user) {
  return new Promise(function (resolve, reject) {
    chai.request(server)
      .post('/api/login')
      .send(user)
      .end((err, res) => {
        if (err) {
          reject(res)
        } else {
          resolve(res.body.token)
        }
      })
  })
}
