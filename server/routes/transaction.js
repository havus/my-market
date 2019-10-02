const router = require('express').Router();
const Transaction = require('../controllers/transaction');
const authentication = require('../middleware/authentication');

router.use(authentication);
router.get('/', Transaction.findAll);
// router.delete('/:id', Transaction.delete);

module.exports = router;