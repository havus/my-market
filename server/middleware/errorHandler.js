function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    let validation = [];
    for (const key in err.errors) {
      validation.push(err.errors[key].message);
    }
    res.status(400).json({
      code: 400,
      message: validation
    })
  } else if (err.name === 'CastError') {
    res.status(400).json({
      code: 400,
      message: 'product_id not valid'
    })
  } else {
    if (err.msg === 'Unauthorize' || err.msg === 'jwt must be provided' || err.msg === 'jwt malformed' || err.msg === 'invalid signature' || err.msg === 'Wrong username / password') {
      res.status(401).json({
        code: 401,
        message: err.msg
      })
    } else if (err.msg === 'product_id required!' || err.msg === 'image required!') {
      res.status(400).json({
        code: 400,
        message: err.msg
      })
    } else {
      res.status(500).json({
        code: 500,
        message: 'internal server error',
      })
    }
  }
  console.log(err);
}

module.exports = errorHandler;