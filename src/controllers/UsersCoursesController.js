const UsersCoursesModel = require('../database/models/UsersCoursesModel');
const CoursesModel = require('../database/models/CoursesModel');

module.exports = {
  async index(request, response){
      const courses = await UsersCoursesModel.find({});

      return response.json(courses);
  },
  async show(request, response) {
    const { id } = request.params;

    // const course = await connection('courses')
    //                       .join('users_courses', 'users_courses.course_id', '=', 'courses.id')
    //                       .where('user_id', id);
    const userCourse = await UsersCoursesModel.find({'user_id': id});
    //console.log(userCourse);

    if ( userCourse.length > 0 ) {
      const promises = userCourse.map(async el => {
        const resp = await CoursesModel.findById(el.course_id);

        return { level: el.level, deadline: el.deadline, ...resp._doc };
      });
      const course = await Promise.all(promises);

      if (course.length === 0) {
        return response.status(400).json({ message: 'Courses not found!' });
      }

      return response.json({ course });
    }

    return response.json({ userCourse });
  },
  async create(request, response) {
      const { 
        user_id, 
        course_id,
        type,
        deadline
      } = request.body;

      const level = type === 'online' ? 1 : 0;

      const userCourse = new UsersCoursesModel();
      userCourse.user_id = user_id;
      userCourse.course_id = course_id;
      userCourse.level = level;
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
  }
}