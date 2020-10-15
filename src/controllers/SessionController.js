const usersModel = require('../database/models/UsersModel');
const bcrypt = require('bcrypt');

module.exports = {
  async create(request, response) {
      const { email, password } = request.body;
      
      const resp = await usersModel.find({'email' : email});
      const user = resp[0];

      if (!user) {
        return response.status(400).json({ message: 'No user found with this email!' });
      }
      
      await bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          return response.status(400).json({ message: 'Incorrect password!' });
        }
  
        return response.json(user);
      });
  }
}