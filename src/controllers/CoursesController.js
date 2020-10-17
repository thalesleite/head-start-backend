const CoursesModel = require('../database/models/CoursesModel');

module.exports = {
  async index(request, response){
      const courses = await CoursesModel.find({});

      return response.json(courses);
  },
  async showActive(request, response) {
    const courses = await CoursesModel.find({'active': true});

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

      const course = new CoursesModel();
      course.name = name;
      course.description1 = description1;
      course.description2 = description2;
      course.description1_pt = description1_pt;
      course.description2_pt = description2_pt;
      course.price = price;
      course.type = type;
      course.duration = duration;
      course.active = true;

      await course.save((err, doc) => {
        if (err) return console.error(err);

        return response.json({ doc });
      });
  },
  async show(request, response) {
    const { id } = request.params;

    const course = await CoursesModel.find({'_id': id});

    if (!course) {
      return response.status(400).json({ message: 'Course not found!' });
    }

    return response.json({ course });
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

    await CoursesModel.findById(id, async (err, course) => {
        if (err) 
          response.json(err);

        course.name = name;
        course.description1 = description1;
        course.description2 = description2;
        course.description1_pt = description1_pt;
        course.description2_pt = description2_pt;
        course.price = price;
        course.type = type;
        course.duration = duration;
        course.active = active;

        await course.save((err) => {
          if (err) 
            response.json(err);

          return response.json({ course });
        });
    });
  }
}