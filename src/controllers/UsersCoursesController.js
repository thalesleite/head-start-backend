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
        type,
        deadline
      } = request.body;

      const level = type === 'online' ? 1 : 0;

      const [id] = await connection('users_courses').insert({
        user_id,
        course_id,
        level,
        deadline,
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
  },
  async update(request, response) {
    const { 
      user_id,
      course_id,
      level
    } = request.body;

    const course = await connection('users_courses')
                          .where('user_id', user_id)
                          .andWhere('course_id', course_id)
                          .update({
                            level: level
                          });

    return response.json({ course });
  }
}