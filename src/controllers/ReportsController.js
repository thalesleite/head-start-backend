const UsersCoursesModel = require('../database/models/UsersCoursesModel');
const CoursesModel = require('../database/models/CoursesModel');
const UsersModel = require('../database/models/UsersModel');

module.exports = {
  async index(request, response){
      const userCourse = await UsersCoursesModel.find({});

      const promises = userCourse.map(async el => {
        const course = await CoursesModel.findById(el.course_id);
        const user = await UsersModel.findById(el.user_id);

        return {
          _id: el._id,
          voucher: el.voucher,
          date_course: el.date_course,
          date_purchase: el.date_purchase,
          course,
          user
        };
      });
      const report = await Promise.all(promises);

      return response.json(report);
  },
}