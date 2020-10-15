const usersCoursesModel = require('../database/models/UsersCoursesModel');
const coursesModel = require('../database/models/CoursesModel');

module.exports = {
  async index(request, response){
      const courses = await usersCoursesModel.find({});

      return response.json(courses);
  },
  async show(request, response) {
    const { id } = request.params;

    // const course = await connection('courses')
    //                       .join('users_courses', 'users_courses.course_id', '=', 'courses.id')
    //                       .where('user_id', id);
    const course = await coursesModel.find({'user_id': id});

    if (!course) {
        return response.status(400).json({ message: 'Courses not found!' });
    }

    return response.json({course});
  },
  async create(request, response) {
      const { 
        user_id, 
        course_id,
        type,
        deadline
      } = request.body;

      const level = type === 'online' ? 1 : 0;

      usersCoursesModel.user_id = user_id;
      usersCoursesModel.course_id = course_id;
      usersCoursesModel.level = level;
      usersCoursesModel.deadline = deadline;
      //usersCoursesModel.date_purchase = connection.fn.now();

      await usersCoursesModel.save((err, doc) => {
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
    
    await usersCoursesModel.find({'user_id': user_id, 'course_id': course_id}, async (err, course) => {
        if (err)
          res.send(err);

        course.level = level;

        await course.save((err) => {
          if (err) res.json(err);

          return response.json({ course });
        });
    });
  }
}