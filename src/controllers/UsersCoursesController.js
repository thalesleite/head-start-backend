const UsersCoursesModel = require('../database/models/UsersCoursesModel');
const CoursesModel = require('../database/models/CoursesModel');

module.exports = {
  async index(request, response){
      const courses = await UsersCoursesModel.find({});

      return response.json(courses);
  },
  async show(request, response) {
    const { id } = request.params;

    const userCourse = await UsersCoursesModel.find({'user_id': id});

    if ( userCourse.length > 0 ) {
      const promises = userCourse.map(async el => {
        const resp = await CoursesModel.findById(el.course_id);

        return { 
          userCourseId: el._id,
          level: el.level,
          dateCourse: el.date_course,
          deadline: el.deadline, 
          ...resp._doc 
        };
      });
      const course = await Promise.all(promises);

      if (course.length === 0) {
        return response.status(400).json({ message: 'Courses not found!' });
      }

      return response.json({ course });
    }

    return response.json({ userCourse });
  },
  async showByCourse(request, response) {
    const { id } = request.params;

    const userCourse = await UsersCoursesModel.findById(id);
    const course = await CoursesModel.findById(userCourse.course_id);

    if (userCourse.length === 0 || course.length === 0) {
      return response.status(400).json({
        message: 'Courses not found!'
      });
    }

    return response.json({ userCourse, ...course });
  },
  async create(request, response) {
      const { 
        user_id, 
        course_id,
        type,
        voucher,
        deadline
      } = request.body;

      const level = type === 'online' ? 1 : 0;
      const setVoucher = type === 'online' ? voucher : '';

      const userCourse = new UsersCoursesModel();
      userCourse.user_id = user_id;
      userCourse.course_id = course_id;
      userCourse.level = level;
      userCourse.voucher = setVoucher;
      userCourse.deadline = deadline;

      await userCourse.save((err, doc) => {
        if (err) return console.error(err);

        return response.json({ doc });
      });
  },
  async update(request, response) {
    const { 
      user_id,
      course_id,
      level
    } = request.body;

    const userCourses = await UsersCoursesModel.find({
      'user_id': user_id,
      'course_id': course_id
    });

    await UsersCoursesModel.findByIdAndUpdate(userCourses[0]._id, {
      level: level
    },
    (err, user) => {
      if (err)
        response.send(err);

      return response.json({user});
    });
  },
  async updateDate(request, response) {
    const {
      id,
      dateCourse
    } = request.body;

    await UsersCoursesModel.findByIdAndUpdate(id, {
        date_course: dateCourse
      },
      (err, doc) => {
        if (err)
          response.send(err);

        return response.json({
          doc
        });
      });
  }
}