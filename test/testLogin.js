var User = require('../models/User.js')

// require dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app.js')

chai.should()
chai.use(chaiHttp)

// Test
describe('Login API', () => {
  // cleaner
  beforeEach((done) => {
    User.remove({}, (er) => {
      done()
    })
  })
  // test Login
  describe('/login user', () => {
    // login fail
    it('it should not login as user doesn\'t exists', (done) => {
      var user = {
        email: 'aviaryan@git.com',
        password: 'password'
      }
      chai.request(server)
        .post('/api/login')
        .send(user)
        .end((er, res) => {
          res.should.have.status(400)
          res.body.should.not.have.property('username')
          done()
        })
    })
    // login success
  })
})
