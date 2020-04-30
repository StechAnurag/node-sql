const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "mysqlroot", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// previous code - using only mysql2 package
/* const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysqlroot",
  database: "node-complete",
});

module.exports = pool.promise(); */
