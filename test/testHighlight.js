var User = require('../models/User.js')
var Highlight = require('../models/Highlight.js')

// require dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app.js')
var helpers = require('./lib/test_helpers.js')
var tokenGlobal

chai.should()
chai.use(chaiHttp)

// Helpers
var getHighlights = function (more) {
  return new Promise(function (resolve, reject) {
    chai.request(server)
      .get('/api/highlights?token=' + tokenGlobal + '&' + more)
      .end((err, res) => {
        if (err) {
          reject(res)
        } else {
          resolve(res)
        }
      })
  })
}

// Test
describe('Highlight API', () => {
  // cleaner, also creates user and sets token
  beforeEach((done) => {
    User.remove({}, (er) => {
      Highlight.remove({}, (er) => {
        // create user
        helpers.createUser(chai, server).then((res) => {
          helpers.loginUser(chai, server).then((token) => {
            tokenGlobal = token
            done()
          })
        })
      })
    })
  })
  // test POST
  describe('/POST highlight', () => {
    it('it should create a new highlight', (done) => {
      var highlight = {
        text: 'Some text that will be stored',
        url: 'http://google.com',
        title: 'Lorem Death'
      }
      chai.request(server)
        .post('/api/highlights?token=' + tokenGlobal)
        .send(highlight)
        .end((er, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('url')
          res.body.url.should.equal(highlight.url)
          res.body.should.not.have.property('category')
          // done
          done()
        })
    })
  })
  // test GET highlights
  describe('/GET highlights', () => {
    // base object
    var highlight = {
      text: 'Some text that will be stored',
      url: 'http://google.com',
      title: 'Lorem Death',
      tags: ['google', 'testcase', 'nene'],
      category: 'unittest',
      comment: 'mah comment'
    }
    // test
    it('it should list all highlights of a user', (done) => {
      helpers.createHl(chai, server, tokenGlobal, highlight).then((res) => {
        chai.request(server)
          .get('/api/highlights?token=' + tokenGlobal)
          .end((er, res) => {
            res.should.have.status(200)
            res.body[0].text.should.equal(highlight.text)
            done()
          })
      }, (err) => {
        done(err)
      })
    })
    // test search 0 results
    it('it should search in highlights with 0 results', (done) => {
      helpers.createHl(chai, server, tokenGlobal, highlight).then((res) => {
        getHighlights('contains=blahblah').then((res) => {
          res.should.have.status(200)
          res.body.length.should.equal(0)
          done()
        })
      }, (err) => {
        done(err)
      })
    })
    // test search positive result
    it('it should do a positive search', (done) => {
      helpers.createHl(chai, server, tokenGlobal, highlight).then((res) => {
        getHighlights('contains=store').then((res) => {
          res.body[0].text.should.equal(highlight.text)
          done()
        })
      }, (err) => {
        done(err)
      })
    })
    // test search positive result with tag search
    it('it should do a positive search using tags', (done) => {
      helpers.createHl(chai, server, tokenGlobal, highlight).then((res) => {
        getHighlights('contains=nene').then((res) => {
          res.body[0].text.should.equal(highlight.text)
          done()
        })
      }, (err) => {
        done(err)
      })
    })
    // end
  })
})
