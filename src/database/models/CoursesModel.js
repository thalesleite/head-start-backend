const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description1: {
    type: String,
    required: true
  },
  description2: {
    type: String
  },
  description1_pt: {
    type: String,
    required: true
  },
  description2_pt: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
});

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;