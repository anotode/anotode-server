var User = require('../models/User.js')

// require dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app.js')
var helpers = require('./lib/test_helpers.js')

chai.should()
chai.use(chaiHttp)

// Test
describe('User API', () => {
  // cleaner
  beforeEach((done) => {
    User.remove({}, (er) => {
      done()
    })
  })
  // test POST
  describe('/POST user', () => {
    it('it should create a new user', (done) => {
      var user = {
        email: 'aviaryan@git.com',
        password: 'password'
      }
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((er, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('username')
          res.body.username.should.equal('aviaryan@git.com')
          res.body.password.should.not.equal('password')
          // done
          done()
        })
    })
  })
  // test GET list
  describe('/GET list user', () => {
    it('it should list all users', (done) => {
      helpers.createUser(chai, server).then((res) => {
        var userId = res.body._id
        chai.request(server)
          .get('/api/users')
          .end((er, res) => {
            res.should.have.status(200)
            res.body[0]._id.should.equal(userId)
            done()
          })
      }, (err) => {
        done(err)
      })
    })
  })
})