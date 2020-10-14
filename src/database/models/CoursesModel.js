const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true,
    default: 1
  },
  token: {
    type: String,
    trim: true
  },
  expires: {
    type: String,
    trim: true
  }
});

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;