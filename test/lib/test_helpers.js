// creates a user using API
exports.createUser = function (chai, server) {
  return new Promise(function (resolve, reject) {
    var user = {
      email: 'aviaryan@git.com',
      password: 'password'
    }
    chai.request(server)
      .post('/api/users?noemail=true')
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
    // fallback user
    if (!user) {
      user = {
        email: 'aviaryan@git.com',
        password: 'password'
      }
    }
    // do login
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

// create highlight
exports.createHl = function (chai, server, token, highlight) {
  return new Promise(function (resolve, reject) {
    chai.request(server)
      .post('/api/highlights?token=' + token)
      .send(highlight)
      .end((err, res) => {
        if (err) {
          reject(res)
        } else {
          resolve(res)
        }
      })
  })
}
