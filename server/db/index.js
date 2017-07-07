const Sequelize = require('sequelize');
const config = require('./dbconfig.js');

const db = new Sequelize(config.dbURL, {
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
    console.log('error connecting to database', err);
  })

module.exports = db;