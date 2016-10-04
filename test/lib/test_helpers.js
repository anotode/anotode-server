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
