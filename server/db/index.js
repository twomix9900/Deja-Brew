const Sequelize = require('sequelize');
const dbConfig = require('./.dbconfig');

console.log('database');

const db = new Sequelize(dbConfig, {
    pool: {
      max: 1,
      min: 0,
      idle: 10000
    }
  }
);

db.authenticate()
  .then(() => {
    console.log('successfully connected to database');
  })
  .catch((err) => {
    console.log('error connecting', err);
  })

module.exports = db;