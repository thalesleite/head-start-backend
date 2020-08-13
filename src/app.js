const express = require('express');
const cors = require('cors');
const { erros } = require('celebrate');
const routes = require('./routes');

const app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.use(routes);

module.exports = app;