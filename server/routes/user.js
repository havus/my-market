const router = require('express').Router();
const User = require('../controllers/user');

router.post('/signup', User.signUp);
router.post('/signin', User.signIn);
router.delete('/delete', User.delete);

// CART
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.use(authentication);

router.get('/cart', User.getCart);

router.post('/cart', User.addCart);
// DELETE CART
router.delete('/cart', authorization, User.deleteCart);
// CHECKOUT
router.post('/cart/checkout', authorization, User.checkOut);

module.exports = router;