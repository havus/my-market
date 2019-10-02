const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const User = require('../../server/models/user');
chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYyMTY0NjQyOTI2Njc3ZjNiZWI4MmEiLCJmdWxsbmFtZSI6InRlc3RpbmcgdGVzdGluZyIsInVzZXJuYW1lIjoidGVzdGluZyIsImVtYWlsIjoidGVzdGluZ0BtYWlsLmNvbSIsImlhdCI6MTU2Njc1OTg1Mn0.HRnLjAPOfx1zkF5EPS9EP7gqMKwwb0Zh5YY19mynsx4'

describe('User', function() {
  
  describe('POST /user/signup', function() {
  //   it('should be return token if username & password & email valid', function(done) {
  //     let obj = {
  //       // fullname: "John Doe",
  //       // username: "johndoew",
  //       email: "john2@mail.com",
  //       password: "johndoe",
  //     }

  //     chai.request('http://localhost:3000')
  //       .post('/user/signup')
  //       .send(obj)
  //       .end(function(err, res) {
  //         expect(res).to.have.status(201);
  //         expect(res.body).to.have.property('token');
  //         done();
  //       })
  //   })

    it('should be return error username is required if username is blank', function(done) {
      let obj = {
        // fullname: "John Doe",
        username: "johndoew",
        email: "john2@mail.com",
        password: "johndoe",
      }

      chai.request('http://localhost:3000')
        .post('/user/signup')
        .send(obj)
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body.code).to.equal(400);
          expect(res.body).to.have.keys(['code', 'message']);
          expect(res.body.message[0]).to.equal("must have fullname");
          done();
        })
    })
  })

  describe('POST /user/signin', function() {
    it('should be return token if username & password & email valid', function(done) {
      let obj = {
        email: "john2@mail.com",
        password: "johndoe",
      }

      chai.request('http://localhost:3000')
        .post('/user/signin')
        .send(obj)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        })
    })

    it('should be failed login invalid username/password', function(done) {
      let obj = {
        email: "john10@mail.com",
        password: "johndoe",
      }

      chai.request('http://localhost:3000')
        .post('/user/signin')
        .send(obj)
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body.code).to.equal(401);
          expect(res.body).to.have.keys(['code', 'message']);
          expect(res.body.message).to.equal('Wrong username / password');
          done();
        })
    })
  })

  describe('POST /user/cart', function() {

    // it('should be success adding to cart if product_id valid', function(done) {
    //   let obj = {
    //     product_id: '5d5ffbd47f4f75162e44d4be',
    //   }

    //   chai.request('http://localhost:3000')
    //     .post('/user/cart')
    //     .set({ token })
    //     .send(obj)
    //     .end(function(err, res) {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.have.property('message');
    //       expect(res.body.message).to.equal('added to cart!');
    //       done();
    //     })
    // })
    
    it('should be error adding to cart if product_id invalid', function(done) {
      let obj = {
        product_id: 'ABCDEF',
      }

      chai.request('http://localhost:3000')
        .post('/user/cart')
        .set({ token })
        .send(obj)
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body.code).to.equal(400);
          expect(res.body).to.have.keys(['code', 'message']);
          expect(res.body.message).to.equal('product_id not valid');
          done();
        })
    })

    it('should be error adding to cart if product_id blank', function(done) {
      chai.request('http://localhost:3000')
        .post('/user/cart')
        .set({ token })
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body.code).to.equal(400);
          expect(res.body).to.have.keys(['code', 'message']);
          expect(res.body.message).to.equal('product_id required!');
          done();
        })
    })
    
    it('should be success get all cart if token is valid', function(done) {
      chai.request('http://localhost:3000')
        .get('/user/cart')
        .set({ token })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        })
    })
    
    it('should be error get all cart if token is invalid', function(done) {
      chai.request('http://localhost:3000')
        .get('/user/cart')
        .set({ token: 'ABCDF' })
        .end(function(err, res) {
          expect(res).to.have.status(401);
          console.log(res.body);
          done();
        })
    })

    it('should be error deleting cart if is not owner cart', function(done) {
        let obj = {
          cart_id: '5d5ffbd47f4f75162e44d4be',
        }
  
        chai.request('http://localhost:3000')
          .delete('/user/cart')
          .set({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYxNGYzOTk5NTQxNDJmYWQ2Y2Q5NWYiLCJmdWxsbmFtZSI6ImFkbWluIGFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjY3NTg3NjJ9.VF5Anz2qh9dbgNGy1pI26loVhwzvxDabnQqgCS823TM' })
          .send(obj)
          .end(function(err, res) {
            expect(res).to.have.status(401);
            expect(res.body.code).to.equal(401);
            expect(res.body).to.have.keys(['code', 'message']);
            expect(res.body.message).to.equal('Unauthorize');
            done();
          })
      })
{
    // it('should be success deleting cart if is owner cart', function(done) {
    //     let obj = {
    //       cart_id: '5d62b2ad47c5873bc04e04d5',
    //     }
  
    //     chai.request('http://localhost:3000')
    //       .delete('/user/cart')
    //       .set({ token })
    //       .send(obj)
    //       .end(function(err, res) {
    //         expect(res).to.have.status(200);
    //         expect(res.body).to.have.property('message');
    //         expect(res.body.message).to.equal('cart deleted!');
    //         done();
    //       })
    //   })
}
{
    // it('should be success checkout cart if is owner cart', function(done) {
    //     let obj = {
    //       cart_id: '5d62b2ba47c5873bc04e04d9',
    //     }
  
    //     chai.request('http://localhost:3000')
    //       .post('/user/cart/checkout')
    //       .set({ token })
    //       .send(obj)
    //       .end(function(err, res) {
    //         expect(res).to.have.status(200);
    //         expect(res.body).to.have.property('message');
    //         expect(res.body.message).to.equal('checkout success!');
    //         done();
    //       })
    //   })
}


  })
})