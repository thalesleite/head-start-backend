const connection = require('../database/connection');
const coursesModel = require('../database/models/CoursesModel');

module.exports = {
  async index(request, response){
      const courses = await coursesModel.find({});

      return response.json(courses);
  },
  async showActive(request, response) {
    // const courses = await connection('courses').select('*').where('active', true);
    const courses = await coursesModel.find({'active': true});

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

      // const [id] = await connection('courses').insert({
      //     name,
      //     description1,
      //     description2,
      //     description1_pt,
      //     description2_pt,
      //     price,
      //     type,
      //     duration,
      //     active: true
      // });

      coursesModel.name = name;
      coursesModel.description1 = description1;
      coursesModel.description2 = description2;
      coursesModel.description1_pt = description1_pt;
      coursesModel.description2_pt = description2_pt;
      coursesModel.price = price;
      coursesModel.type = type;
      coursesModel.duration = duration;
      coursesModel.active = true;

      await food.save((err, doc) => {
        if (err) return console.error(err);

        return response.json({ doc });
      });
  },
  async show(request, response) {
    const { id } = request.params;

    //const course = await connection('courses').where('id', id).first();
    const course = await coursesModel.find({'_id': id});

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
      duration,
      active
    } = request.body;

    const course = await connection('courses').where('id', id).update({
      name: name,
      description1: description1,
      description2: description2,
      description1_pt: description1_pt,
      description2_pt: description2_pt,
      price: price,
      type: type,
      duration: duration,
      active: active
    });

    return response.json({ course });
  }
}