const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UsersCoursesSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  course_id: {
    type: ObjectId,
    required: true
  },
  level: {
    type: Number
  },
  voucher: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  date_purchase: {
    type: Date,
    default: Date.now,
    required: true
  },
  date_course: {
    type: Date
  }
});

const UsersCourses = mongoose.model('users_courses', UsersCoursesSchema);
module.exports = UsersCourses;