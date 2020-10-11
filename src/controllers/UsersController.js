const connection = require('../database/connection');
const crypto = require('crypto');

const EmailController = require('./EmailController');

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

        let levelCourse, deadlineCourse = null;
        if ( course.length > 0 ) {
            const { level, deadline } = course[0];
            levelCourse = level;
            deadlineCourse = deadline;
        }

        const user = await connection('users')
            .where('id', id)
            .select('id', 'name', 'email', 'address', 'phone', 'type')
            .first();

    return response.json({level: levelCourse, deadline: deadlineCourse,...user});
  },
  async update(request, response) {
      const { 
        id,  
        name,
        email,
        address,
        phone
      } = request.body;
  
      const course = await connection('users').where('id', id).update({
        name,
        email,
        address,
        phone
      });
  
      return response.json({ course });
  },
  async token(request, response) {
    const { token } = request.params;

    const user = await connection('users')
                        .where('token', token)
                        .first();
    const now = Date.now();

    if ( !user /*|| ( user.expires < now )*/ ) {
        return response.status(400).json({ message: 'Token has expired!' });
    }

    return response.json(user);
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

            if (id) {
                await EmailController.sendRegistrationEmail( name, email );
            }
            
            return response.json({ id });
    });
  },
  async setToken(request, response) {
    const { email } = request.body;

    const user = await connection('users').select('*').where('email', email).first();
    if ( !user ) {
      return response.status(400).json({ message: 'Email not found!' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000;

    const userToken = await connection('users').where('email', email).update({
        token,
        expires
    });

    if ( userToken ) {
        await EmailController.sendPassword( email , token );
    }
    
    return response.json({ userToken });
  },
  async resetPassword(request, response) {
    const { id, password } = request.body;

    bcrypt.hash(password, saltRounds, 
        async (err, hash) => {
            if (err) {
                return err.message;
            }

            const user = await connection('users').where('id', id).update({
                password: hash,
                token: null,
                expires: null
            });

            return response.json({ user });
    });
    
  }
}