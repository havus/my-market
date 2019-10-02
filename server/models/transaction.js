const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'user_id is required!']
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, 'product_id is required!']
  },
  count: {
    type: Number,
  },
  total_payment: {
    type: Number,
    required: [true, 'total payment is required!']
  }
}, { timestamps: true, versionKey: false });

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;