const User = require('../models/user');
const Product = require('../models/product');
const Transaction = require('../controllers/transaction');

const { hashPassword, comparePassword } = require('../helper/bcryptjs');
const { jwtHash, jwtVerify } = require('../helper/jwt');

class UserController {
  static signUp(req, res, next) {
    let {username, fullname, email, password} = req.body;

    let obj = {
      username, fullname, email, password
    }
    
    User.create(obj)
    .then((data) => {
      let token = {
        fullname,
        username,
        email
      }
      res.status(201).json({ token: jwtHash(token) });
    })
    .catch(next);
  }

  static signIn(req, res, next) {
    let {email, password} = req.body;
    if (!password || !email) {
      next({
        msg: 'Wrong username / password',
      })
    } else {
      User.findOne({ email })
      .then(one => {
        if (one) {
          if (comparePassword(password, one.password)) {
            const {_id, fullname, username, email } = one;
            let obj = {_id, fullname, username, email };
            console.log('berhasil login');
            res.status(200).json({ token: jwtHash(obj) });
          } else {
            next({
              msg: 'Wrong username / password'
            })
          }
        } else {
          next({
            msg: 'Wrong username / password'
          })
        }
      })
      .catch(next);
    }
  }

  static delete(req, res, next) {
    User.deleteMany({})
    .then(() => {
      console.log('delete berhasil');
      res.status(200).json({msg: "berhasil"})
    })
    .catch(next);
  }

  static addCart(req, res, next) {
    const { count = 1, product_id } = req.body;
    if (!product_id) {
      next({
        msg: 'product_id required!'
      })
    } else {
      let productFindOne = Product.findOne({ _id: product_id });
      let userFindCart = User.findOne({ _id: req.payload._id })
      Promise.all([productFindOne, userFindCart])
        .then(([productFindOne, userFindCart]) => {
          let existCart = userFindCart.cart.filter(e => e.product == product_id);
          if (existCart.length > 0) {
            let existCartId = existCart[0]._id;
            let existCount = existCart[0].count;
            return User.updateOne(
              { 
                _id: req.payload._id,
                "cart._id": existCartId
              },
              { $set: {
                  "cart.$.count": (+existCount) + (+count),
                  "cart.$.total_payment": ((+existCount) + (+count)) * (+productFindOne.price),
                }
              }
            )
          } else {
            return User.updateOne(
              { _id: req.payload._id },
              { 
                $push: {
                  cart: {
                    product: product_id,
                    count,
                    total_payment: +productFindOne.price * +count,
                    status: false
                  } 
                } 
              }
            )
          }
        })
        .then((data) => {
          res.status(200).json({ message: 'added to cart!' });
        })
        .catch(next)
    }
  }

  static getCart(req, res, next) {
    User.findOne({ _id: req.payload._id }).populate('cart.product')
    .select('cart')
    .exec(function(err, data) {
      if (err) next(err);
      const option = {
        path: 'cart.product',
        model: 'Product'
      }
      Product.populate(data.cart, option, function(err, carts) {
        if (err) next(err);

        res.status(200).json(carts);
        // console.log(JSON.stringify(carts, null, 2));
      })
    })
  }

  static checkOut(req, res, next) {
    User.findOne({ _id: req.payload._id })
    .then(one => {
        let theCart = one.cart.filter(e => e._id == req.body.cart_id)
        return Transaction.create({
          user_id: req.payload._id,
          product_id: theCart[0].product,
          count: theCart[0].count,
          total_payment: theCart[0].total_payment,
        })
      })
      .then(() => {
        return User.updateOne(
          { 
            _id: req.payload._id,
          },
          { 
            '$pull': { 
              cart: {
                _id: req.body.cart_id
              }
            }
          }
        )
      })
      .then(data => {
        res.status(200).json({message: "checkout success!"})
      })
      .catch(next)
  }

  static updateCart(req, res, next) {
    
  }

  static deleteCart(req, res, next) {
    User.updateOne(
      { 
        _id: req.payload._id,
      },
      { 
        '$pull': { 
          cart: {
            _id: req.body.cart_id
          }
        }
      }
    ) 
      .then(() => {
        res.status(200).json({ message: 'cart deleted!' })
      })
  }
}

module.exports = UserController;