<<<<<<< HEAD
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
=======

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create the pool
const pool = mysql.createPool(dbConfig);

// Test connection logic (fails gracefully)
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✔ Database connection pool established.');
    connection.release();
  } catch (error) {
    console.error('✘ Database connection failed. Backend is running in degraded mode.');
    // Do not crash the app; allow health check to report status
  }
};

testConnection();
>>>>>>> 96d0b75bfd2d9e6c79feae7589d7f70b5ef7ea3e

module.exports = pool;
