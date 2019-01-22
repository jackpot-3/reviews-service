// PostgresSQL Database connection
const { Pool } = require('pg');
const faker = require('faker');

const connection = new Pool({
  user: 'bill',
  database: 'bill',
  password: 'black2018',
});

console.log('**** db ****');

module.exports = connection;
