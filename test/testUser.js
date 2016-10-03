// set test database
process.env.DATABASE_URL = 'mongodb://localhost:27017/anotode_test'

var User = require('../models/User.js')

// require dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app.js')
var should = chai.should()

chai.use(chaiHttp)

// Test
describe('User API', () => {
  // cleaner
  beforeEach((done) => {
    User.remove({}, (err) => {
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
        .end((err, res) => {
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
})
