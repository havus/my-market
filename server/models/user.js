const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helper/bcryptjs');

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'must have fullname']
  },
  username: {
    type: String,
    unique: [true, 'username must unique'],
    validate: [(val) => {
      if (val.includes(' ') || val.includes('@') || val.includes('.')) {
        return false;
      }
      return true;
    }, `username must not contain '@', ' ', '.'`]
  },
  email: {
    type: String,
    required: [true, 'email required!'],
    unique: [true, 'email must unique'],
    validate: [function(val) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
    }, 'email not valid']
  },
  password: {
    type: String,
    minlength: [6, `password must have min length 8`],
    required: [true, `password required`],
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      count: {
        type: Number,
        default: 1,
      },
      total_payment: {
        type: Number,
      },
      status: {
        type: Boolean,
        default: false
      },
    }
  ],
  profile_pic: {
    type: String,
    default : 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg',
  }
}, { timestamps: true, versionKey: false });

UserSchema.pre('save', function() {
  this.password = hashPassword(this.password);
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
