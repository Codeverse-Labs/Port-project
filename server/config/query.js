const mysql = require('mysql');

// Create connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

// Export the pool
module.exports = pool;
