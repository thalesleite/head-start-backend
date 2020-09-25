const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
  async create(request, response) {
      const { email, password } = request.body;

      const user = await connection('users')
        .where('email', email)
        .select('id', 'name', 'password', 'email', 'type')
        .first()
      ;

      if (!user) {
        return response.status(400).json({ message: 'No user found with this email!' });
      }

      await bcrypt.compare(password, user.password, function(err, result) {
        if (!result) {
          return response.status(400).json({ message: 'Incorrect password!' });
        }
  
        return response.json(user);
      });
  }
}