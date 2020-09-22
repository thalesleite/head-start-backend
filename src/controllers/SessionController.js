const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
  async create(request, response) {
      const { email, password } = request.body;

      const user = await connection('users')
        .where('email', email)
        .select('name', 'email', 'password', 'type')
        .first()
      ;

      if (!user) {
        return response.status(400).json({ error: 'No user found with this email!' });
      }

      await bcrypt.compare(password, user.password, function(err, result) {
        if (!result) {
          return response.status(400).json({ error: 'Password does not match!' });
        }
  
        return response.json(user);
      });
  }
}