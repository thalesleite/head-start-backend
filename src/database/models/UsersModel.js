const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    trim: true
  },
  type: {
    type: Number,
    required: true,
    default: 1
    // 1 - Student User
    // 0 - Admin User
  },
  token: {
    type: String,
    trim: true,
  },
  expires: {
    type: Number
  }
});

const Users = mongoose.model('users', UsersSchema);
module.exports = Users;