const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name product is required']
  },
  stock: {
    type: Number,
    required: [true, 'stock is required']
  },
  price: {
    type: Number,
    required: [true, 'product must have price']
  },
  description: {
    type: String,
    required: [true, 'description required!']
  },
  img_url: {
    type: String,
    required: [true, 'image required to sell product']
  }
}, { timestamps: true, versionKey: false });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;