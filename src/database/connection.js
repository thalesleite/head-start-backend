const knex = require('knex');
const config = require('../../knexfile');

const env = process.env.NODE_ENV === 'production' ? config.production : config.development;

const connection = knex(env);

module.exports = connection;