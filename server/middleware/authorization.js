const {jwtVerify} = require('../helper/jwt');
const User = require('../models/user')

module.exports = (req, res, next) => {
  User.findOne({ _id: req.payload._id })
  .then(one => {
    const cart = one.cart;
    let exist = cart.filter(el => el._id == req.body.cart_id);
    if (exist.length > 0) {
      console.log('<< authorize >>');
      next();
    } else {
      next({
        code: 401,
        msg: 'Unauthorize',
      })
    }
  })
  .catch(err => {
    next({
      code: 500,
      msg: err.message
    })
  })
}