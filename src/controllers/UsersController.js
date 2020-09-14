const connection = require('../database/connection');

module.exports = {
  async index(request, response){
      const users = await connection('users').select('*');

      return response.json(users);
  },
  async create(request, response) {
      const { name, email, password, address, phone, type } = request.body;

      const [id] = await connection('users').insert({
          name,
          email,
          password,
          address,
          phone,
          type
      });

      return response.json({ id });
  }
}