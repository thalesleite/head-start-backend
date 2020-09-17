const connection = require('../database/connection');

module.exports = {
  async index(request, response){
      const courses = await connection('courses').select('*');

      return response.json(courses);
  },
  async create(request, response) {
      const { 
        name, 
        description1, 
        description2, 
        description1_pt, 
        description2_pt, 
        price, 
        type, 
        duration 
      } = request.body;

      const [id] = await connection('courses').insert({
          name,
          description1,
          description2,
          description1_pt,
          description2_pt,
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
  },
  async update(request, response) {
    const { 
      id,  
      name,
      description1,
      description2,
      description1_pt,
      description2_pt,
      price,
      type,
      duration
    } = request.body;

    const course = await connection('courses').where('id', id).update({
      name: name,
      description1: description1,
      description2: description2,
      description1_pt: description1_pt,
      description2_pt: description2_pt,
      price: price,
      type: type,
      duration: duration
    });

    return response.json({ course });
  }
}