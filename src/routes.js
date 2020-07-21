const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes  = express.Router();

const UsersController = require('./controllers/UsersController');
//const SessionController = require('./controllers/SessionController');

routes.get('/users', UsersController.index);

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      type: Joi.number().required()
  })
}), UsersController.create);

module.exports = routes;