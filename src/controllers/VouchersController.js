const VouchersModel = require('../database/models/VouchersModel');

module.exports = {
  async index(request, response){
    const vouchers = await VouchersModel.find({});

    return response.json(vouchers);
  },
  async update(request, response) {
    const { id } = request.body;

    await VouchersModel.findByIdAndUpdate(id, {
      limit: 0
    },
    (err, user) => {
      if (err)
        response.send(err);

      return response.json({
        user
      });
    });
  }
}