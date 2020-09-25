const connection = require('../database/connection');

module.exports = {
  async index(request, response){
      const courses = await connection('users_courses').select('*');

      return response.json(courses);
  },
  async create(request, response) {
      const { 
        user_id, 
        course_id,
        duration
      } = request.body;

      const [id] = await connection('users_courses').insert({
        user_id,
        course_id,
        days_left: duration,
        date_purchase: connection.fn.now()
      });

      return response.json({ id });
  },
  async show(request, response) {
    const { id } = request.params;

    const course = await connection('courses')
                          .join('users_courses', 'users_courses.course_id', '=', 'courses.id')
                          .where('user_id', id);

    if (!course) {
        return response.status(400).json({ message: 'Courses not found!' });
    }

    return response.json({course});
  }
}