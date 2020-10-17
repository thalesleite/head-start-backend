const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routes');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//connect to database
const mongo = mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@headstart.vrt97.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
mongo.then(() => {
    console.log('DB connected!!!');
}, error => {
    console.log(error, 'DB error');
});

app.use(routes);
app.use(errors());

module.exports = app;