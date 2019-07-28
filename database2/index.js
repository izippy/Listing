const { Pool } = require('pg');

const pool = new Pool({
  user: 'cassandratong',
  host: 'localhost',
  database: 'izippy',
  password: '',
});

module.exports = pool;