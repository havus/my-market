const Transaction = require('../models/transaction');

class TransactionController {
  static create(obj) {
    return Transaction.create(obj)
  }

  static findAll(req, res, next) {
    Transaction.find({
      user_id: req.payload._id
    }).populate('product_id')
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
}

module.exports = TransactionController;