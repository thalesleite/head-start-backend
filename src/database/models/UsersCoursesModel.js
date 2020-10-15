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
  deadline: {
    type: Date,
    required: true
  },
  date_purchase: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const UsersCourses = mongoose.model('UsersCourses', UsersCoursesSchema);
module.exports = UsersCourses;