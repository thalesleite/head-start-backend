const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes  = express.Router();

const UsersController = require('./controllers/UsersController');
const CoursesController = require('./controllers/CoursesController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/users', UsersController.index);

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.number().required(),
      type: Joi.number().required()
  })
}), UsersController.create);

routes.get('/courses', CoursesController.index);

routes.post('/courses', celebrate({
  [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description1: Joi.string().required(),
      description2: [Joi.string().optional(), Joi.allow(null)],
      price: Joi.number().required(),
      type: Joi.string().required(),
      duration: Joi.number().required()
  })
}), CoursesController.create);

module.exports = routes;