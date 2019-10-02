const Product = require('../models/product');

class ProductController {
  static create(req, res, next) {
    const { name, stock, price, description } = req.body;
    // req.file.url || req.file.public_id;
    console.log(req.file.url);
    Product.create({name, stock, price, description, img_url: req.file.url})
      .then(data => {
        res.status(201).json(data);
      })
      .catch(next);
  }

  static findAll(req, res, next) {
    Product.find({})
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next)
  }
    
  static findOne(req, res, next) {
    Product.find({_id: req.params.id})
      .then(one => {
        res.status(200).json(one);
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { name, stock, price } = req.body;
    if (!name || !stock || !price || !req.file.url) {
      next({
        code: 400,
        message: "name, stock, price, img_url not allowed null"
      })
    }

    Product.findOneAndUpdate({ _id: req.params.id }, {name, stock, price, img_url: req.file.url}, {new: true})
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({message: "product has been deleted"})
      })
      .catch(next)
  }
}

module.exports = ProductController;