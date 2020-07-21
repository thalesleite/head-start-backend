const connection = require('../database/connection');

module.exports = {
  async index(request, response){
      const courses = await connection('courses').select('*');

      return response.json(courses);
  },
  async create(request, response) {
      const { name, description, duration } = request.body;

      const [id] = await connection('courses').insert({
          name,
          description,
          duration
      });

      return response.json({ id });
  }
}