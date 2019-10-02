if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONNECTION <<<<<<<<<<<<<<<<<<<,
const mongoose = require('mongoose');
mongoose.connect(process.env.CLUSTER_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


// ROUTE <<<<<<<<<<<<<<<<<<<<
const user = require('./routes/user');
app.use('/user', user);
const product = require('./routes/product');
app.use('/product', product);
const transaction = require('./routes/transaction');
app.use('/transaction', transaction);

const errHandler = require('./middleware/errorHandler');
app.use(errHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('\x1b[33m\x1b[1m', ' * * * * * * * * * * * * * * * * * * * * * * * *');
  console.log(
    '\x1b[33m\x1b[1m', ' *',
    '\x1b[37m\x1b[1m', `Exclusive connected to port >>>>>> ${process.env.PORT || 3000}!`,
    '\x1b[33m\x1b[1m', ' *','\x1b[34m\x1b[1m');
    // console.log(`Exclusive connected to port >>>>>> 3000!`)
  console.log('\x1b[33m\x1b[1m', ' * * * * * * * * * * * * * * * * * * * * * * * *');
});