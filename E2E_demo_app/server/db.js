// MySQL connection pool.
// All values come from environment variables — nothing is hardcoded.
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

// Export a promise-based pool so we can use async/await in our routes.
module.exports = pool.promise();
