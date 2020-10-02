const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async index(request, response){
      const users = await connection('users').select('*');

      return response.json(users);
  },
  async show(request, response) {
        const { id } = request.params;

        const course = await connection('users_courses')
                          .join('courses', 'users_courses.course_id', '=', 'courses.id')
                          .where('user_id', id);

        let levelCourse = null;
        if ( course.length > 0 ) {
            const { level } = course[0];
            levelCourse = level;
        }

        const user = await connection('users')
            .where('id', id)
            .select('id', 'name', 'email', 'type')
            .first();

    return response.json({level: levelCourse, ...user});
  },
  async create(request, response) {
    const { name, email, password, address, phone, type } = request.body;

    const user = await connection('users').select('*').where('email', email).first();
    if ( user ) {
        return response.status(400).json({ message: 'Email already registered!' });
    }

    bcrypt.hash(password, saltRounds, 
        async (err, hash) => {
            if (err) {
                return err.message;
            }

            const [id] = await connection('users').insert({
                name,
                email,
                password: hash,
                address,
                phone,
                type
            });

            return response.json({ id });
    });
  }
}