const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async index(request, response){
      const users = await connection('users').select('*');

      return response.json(users);
  },
  async create(request, response) {
    const { name, email, password, address, phone } = request.body;
    const type = 1;

    bcrypt.hash(password, saltRounds, 
        async (err, hash) => {
            if ( err ) {
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