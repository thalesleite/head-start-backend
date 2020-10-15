const UsersModel = require('../database/models/UsersModel');
const UsersCoursesModel = require('../database/models/UsersCoursesModel');

const EmailController = require('./EmailController');

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async index(request, response){
      const users = await UsersModel.find({});

      return response.json(users);
  },
  async show(request, response) {
        const { id } = request.params;

        // const course = await connection('users_courses')
        //                   .join('courses', 'users_courses.course_id', '=', 'courses.id')
        //                   .where('user_id', id);
        let course = await UsersCoursesModel.find({ 'user_id': id });

        let levelCourse, deadlineCourse = null;
        if ( course.length > 0 ) {
            const { level, deadline } = course[0];
            levelCourse = level;
            deadlineCourse = deadline;
        }

        // const user = await connection('users')
        //     .where('id', id)
        //     .select('id', 'name', 'email', 'address', 'phone', 'type')
        //     .first();
        const user = await UsersModel.find({ 'user_id': id });

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

    await UsersModel.findById(id, async (err, user) => {
        if (err)
          res.send(err);

        user.name = name;
        user.email = email;
        user.address = address;
        user.phone = phone;
        
        await user.save((err) => {
          if (err) res.json(err);

          return response.json({ user });
        });
    });
  },
  async token(request, response) {
    const { token } = request.params;

    const user = await UsersModel.find({'token': token});

    const now = Date.now();

    if ( !user || ( user.expires < now ) ) {
        return response.status(400).json({ message: 'Token has expired!' });
    }

    return response.json(user);
  },
  async create(request, response) {
    const { name, email, password, address, phone, type } = request.body;

    const user = await UsersModel.find({'email': email});

    if ( user.length > 0 ) {
        return response.status(400).json({ message: 'Email already registered!' });
    }

    bcrypt.hash(password, saltRounds, 
      async (err, hash) => {
          if (err) {
            return err.message;
          }

          const user = new UsersModel();
          user.name = name;
          user.email = email;
          user.password = hash;
          user.address = address;
          user.phone = phone;
          user.type = type;

          await user.save((err, doc) => {
            if (err) return console.error(err);

            if (doc) {
              EmailController.sendRegistrationEmail( name, email );
            }
            
            return response.json('User created!');
          });
    });
  },
  async setToken(request, response) {
    const { email } = request.body;

    const user = await UsersModel.find({'email': email});

    if ( !user ) {
      return response.status(400).json({ message: 'Email not found!' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000;

    // const userToken = await connection('users').where('email', email).update({
    //     token,
    //     expires
    // });

    await UsersModel.find({ 'email': email }, async (err, user) => {
        if (err)
          res.send(err);

        user.token = token;
        user.expires = expires;
        
        await user.save(async (err) => {
          if (err) res.json(err);

          await EmailController.sendPassword( email , token );

          return response.json({ user });
        });
    });
  },
  async resetPassword(request, response) {
    const { id, password } = request.body;

    bcrypt.hash(password, saltRounds, 
      async (err, hash) => {
        if (err) {
            return err.message;
        }

        await UsersModel.findById(id, async (err, user) => {
            if (err)
              res.send(err);

            user.password = hash;
            user.token = null;
            user.expires = null;
            
            await user.save((err) => {
              if (err) res.json(err);
    
              return response.json({ user });
            });
        });
    });
    
  }
}