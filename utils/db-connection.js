const mysql = require("mysql2");

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "shwetangi2003",
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a promise wrapper for the pool
const promisePool = pool.promise();

// Test the connection and create table if it doesn't exist
const initializeDatabase = async () => {
  try {
    // Test connection
    const [rows] = await promisePool.execute('SELECT 1');
    console.log("Connected to MySQL");

    // Create table if it doesn't exist
    const creationQuery = `
      CREATE TABLE IF NOT EXISTS Student (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;

    await promisePool.execute(creationQuery);
    console.log("Table Student is ready");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
};

// Initialize the database
initializeDatabase();

// Export both the pool and promise pool
module.exports = {
  pool,
  promisePool
};
