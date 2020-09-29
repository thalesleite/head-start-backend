const knex = require('knex');
const config = require('../../knexfile');

//const env = process.env.NODE_ENV === 'test' ? config.test : config.development;
//console.log(process.env);
const env = config.development;

const connection = knex(env);

module.exports = connection;