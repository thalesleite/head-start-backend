// const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response){
      const users = await connection('users').select('*');

      return response.json(users);
  },
  async create(request, response) {
      //const { name, email, whatsapp, city, uf } = request.body;
      //const id = generateUniqueId();

      const name = "Thales Leite",
            email = "thales@email.com",
            password = "password",
            type = 0
      ;

      const [id] = await connection('users').insert({
          name,
          email,
          password,
          type
      });

      return response.json({ id });
  }
}