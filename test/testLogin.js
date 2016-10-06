var User = require('../models/User.js')

// require dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app.js')
var helpers = require('./lib/test_helpers.js')

chai.should()
chai.use(chaiHttp)

// Test
describe('Login API', () => {
  // define generic user
  var user = {
    email: 'aviaryan@git.com',
    password: 'password'
  }
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
    it('it should login', (done) => {
      helpers.createUser(chai, server).then((res) => {
        chai.request(server)
          .post('/api/login')
          .send(user)
          .end((er, res) => {
            res.should.have.status(200)
            res.body.should.have.property('token')
            done()
          })
      }, (err) => {
        done(err)
      })
    })
  })
})
