const mongoose = require('mongoose');

const VouchersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  has_limit: {
    type: Boolean,
    required: true,
    default: false
  },
  limit: {
    type: Number,
    default: 0
  }
});

const Vouchers = mongoose.model('vouchers', VouchersSchema);
module.exports = Vouchers;