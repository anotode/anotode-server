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
        .post('/api/users?noemail=true')
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
  // test GET single user
  describe('/GET single user', () => {
    it('it should display details of single user', (done) => {
      // create user
      helpers.createUser(chai, server).then((res) => {
        // login
        helpers.loginUser(chai, server).then((token) => {
          // get details
          chai.request(server)
            .get('/api/users/user?token=' + token)
            .end((er, res) => {
              res.should.have.status(200)
              res.body.email.should.equal('aviaryan@git.com')
              res.body.username.should.equal('aviaryan@git.com')
              done()
            })
        }, (err) => {
          done(err)
        })
      }, (err) => {
        done(err)
      })
    })
  })
  // test POST already existing user
  describe('/POST single user fail', () => {
    it('it should test creating duplicate user', (done) => {
      // create first user
      helpers.createUser(chai, server).then((res) => {
        // create second user
        helpers.createUser(chai, server).then((res) => {
          done('This is wrong')
        }, (err) => {
          err.should.have.status(400)
          err.body.should.have.property('error')
          done()
        })
      })
    })
  })
})
