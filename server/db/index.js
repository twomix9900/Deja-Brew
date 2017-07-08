const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

db = new Sequelize(process.env.DB_URL, {
    pool: {
      max: 1,
      min: 0,
      idle: 10000
    }
  }
);

module.exports = db;
