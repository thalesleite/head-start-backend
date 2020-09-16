const connection = require('../database/connection');

module.exports = {
  async index(request, response){
      const courses = await connection('courses').select('*');

      return response.json(courses);
  },
  async create(request, response) {
      const { name, description1, description2, price, type, duration } = request.body;

      const [id] = await connection('courses').insert({
          name,
          description1,
          description2,
          price,
          type,
          duration
      });

      return response.json({ id });
  },
  async show(request, response) {
    const { id } = request.params;

    const course = await connection('courses').where('id', id).first();

    if (!course) {
        return response.status(400).json({ message: 'Course not found!' });
    }

    return response.json({course});
  }
}