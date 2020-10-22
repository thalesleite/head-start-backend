const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes  = express.Router();

const UsersController = require('./controllers/UsersController');
const CoursesController = require('./controllers/CoursesController');
const UsersCoursesController = require('./controllers/UsersCoursesController');
const SessionController = require('./controllers/SessionController');
const EmailController = require('./controllers/EmailController');
const PaymentController = require('./controllers/PaymentController');
const ReportsController = require('./controllers/ReportsController');

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}), SessionController.create);

routes.post('/payment-session', PaymentController.create);

routes.get('/users', UsersController.index);
routes.get('/user/:id', UsersController.show);
routes.put('/user/:id', UsersController.update);
routes.get('/user-validate/:token', UsersController.token);
routes.put('/user-reset-password', UsersController.resetPassword);
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
routes.post('/users-token', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required()
  })
}), UsersController.setToken);

routes.get('/courses', CoursesController.index);
routes.get('/courses-active/', CoursesController.showActive);
routes.get('/courses/:id', CoursesController.show);
routes.put('/courses/:id', CoursesController.update);
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

routes.get('/user-courses/:id', UsersCoursesController.show);
routes.get('/user-courses-course/:id', UsersCoursesController.showByCourse);
routes.put('/user-courses', UsersCoursesController.update);
routes.put('/user-courses-date', UsersCoursesController.updateDate);
routes.post('/user-courses', celebrate({
  [Segments.BODY]: Joi.object().keys({
    user_id: Joi.string().required(),
    course_id: Joi.string().required(),
    type: Joi.string().required(),
    deadline: Joi.string().required(),
    voucher: [Joi.string().optional(), Joi.allow(null)]
  })
}), UsersCoursesController.create);

routes.post('/send', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.number().required(),
    subject: Joi.string().required(),
    message: Joi.string().required()
  })
}), EmailController.sendEmail);
routes.post('/send-certificate', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email()
  })
}), EmailController.sendCertificate);
routes.post('/send-password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
  })
}), EmailController.sendPassword);

routes.get('/reports', ReportsController.index);

module.exports = routes;