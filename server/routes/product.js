const router = require('express').Router();
const Product = require('../controllers/product');
// UPLOUD VIA CLOUDINARY
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "product_img",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage });

const authorization = function(req, res, next) {
  if (req.payload.username === 'admin') {
    next()
  } else {
    next({
      code: 401,
      message: 'admin unauthorize'
    })
  }
}

const authentication = require('../middleware/authentication');
router.use(authentication);
router.get('/', Product.findAll);
router.get('/:id', Product.findOne);
router.post('/', authorization, parser.single("image"), (req, res, next) => {
  if (!req.file) {
    next({ msg: 'image required!' });
  } else {
    next();
  }
}, Product.create);

router.put('/:id', authorization, parser.single("image"), (req, res, next) => {
  if (!req.file) {
    next({ msg: 'image required!' });
  } else {
    next();
  }
}, Product.update);

router.delete('/:id', authorization, Product.delete);

module.exports = router;