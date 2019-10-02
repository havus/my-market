const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const User = require('../../server/models/user');
chai.use(chaiHttp);

describe('Product', function() {
  describe('POST /product', function() {
    it('should be return error if one field is blank', function(done) {
      const obj = {
        name: 'hape',
        stock: 9,
        price: 100000,
        description: '',
        // images: ''
      }
      
      chai.request('http://localhost:3000')
      .post('/product')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYxNGYzOTk5NTQxNDJmYWQ2Y2Q5NWYiLCJmdWxsbmFtZSI6ImFkbWluIGFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjY3NjEwNjR9.-96w3F-RordarcdNxj9QhikRIYMsejDCmxUxMN2AKGc')
      .send(obj)
      .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.body.code).to.equal(400);
          expect(res.body).to.have.keys(['code', 'message']);
          expect(res.body.message).to.equal('image required!');
        done();
      })
    })
  })

  describe('DELETE /product', function() {
    it('should be return error if one field is blank', function(done) {
      chai.request('http://localhost:3000')
      .delete('/product/5d62a2e15d8d5a32631abaaf')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYxNGYzOTk5NTQxNDJmYWQ2Y2Q5NWYiLCJmdWxsbmFtZSI6ImFkbWluIGFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE1NjY3NjEwNjR9.-96w3F-RordarcdNxj9QhikRIYMsejDCmxUxMN2AK')
      .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body.code).to.equal(401);
          expect(res.body).to.have.keys(['code', 'message']);
        done();
      })
    })
  })
})

describe('Transaction', function() {
  it('should be return array transaction', function(done) {
    chai.request('http://localhost:3000')
    .get('/transaction')
    .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDYyMTY0NjQyOTI2Njc3ZjNiZWI4MmEiLCJmdWxsbmFtZSI6InRlc3RpbmcgdGVzdGluZyIsInVzZXJuYW1lIjoidGVzdGluZyIsImVtYWlsIjoidGVzdGluZ0BtYWlsLmNvbSIsImlhdCI6MTU2Njc2MjA0NX0.3NttTz8IUAN3BoXLW14BCO98hPn8Qedx4axTNcMFj-o'})
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      res.body.forEach(el => {
        expect(el).to.have.keys(['_id', 'product_id', 'user_id', 'count', 'total_payment', 'createdAt', 'updatedAt']);
      });
      done();
    })
  })
})