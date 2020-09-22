const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes  = express.Router();

const UsersController = require('./controllers/UsersController');
const CoursesController = require('./controllers/CoursesController');
const SessionController = require('./controllers/SessionController');
const EmailController = require('./controllers/EmailController');
const PaymentController = require('./controllers/PaymentController');

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}), SessionController.create);

routes.post('/payment-session', PaymentController.create);

routes.get('/users', UsersController.index);
routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).alphanum().required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
    type: [Joi.string().optional(), Joi.allow(null)]
  })
}), UsersController.create);

routes.get('/courses', CoursesController.index);
routes.get('/courses/:id', CoursesController.show);
routes.put('/courses/:id', CoursesController.update);
routes.delete('/courses/:id', CoursesController.delete);
routes.post('/courses', celebrate({
  [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description1: Joi.string().required(),
      description2: [Joi.string().optional(), Joi.allow(null)],
      description1_pt: Joi.string().required(),
      description2_pt: [Joi.string().optional(), Joi.allow(null)],
      price: Joi.number().required(),
      type: Joi.string().required(),
      duration: Joi.number().required()
  })
}), CoursesController.create);

routes.post('/send', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required(),
  })
}), EmailController.sendEmail);

module.exports = routes;