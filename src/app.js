const express = require('express');
const cors = require('cors');
const { erros } = require('celebrate');
const routes = require('./routes');

const app = express();

// app.use((req, res, next) => {
//   // res.header('Access-Control-Allow-Origin', '*');
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(express.json());
//app.use(cors());
app.use(routes);

module.exports = app;