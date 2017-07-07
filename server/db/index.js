const Sequelize = require('sequelize');
const config = require('../../config.js');
var dotenv = require('dotenv').config()

const db = new Sequelize(process.env.DB_URL, {
    pool: {
      max: 1,
      min: 0,
      idle: 10000
    }
  }
);

const User = db.define('user', {
  nickname: Sequelize.STRING(32),
  email: Sequelize.STRING(64),
  phone: Sequelize.INTEGER
});

const Friend = db.define('friend', {
  name: Sequelize.STRING(32),
  phone: Sequelize.INTEGER
});

User.hasMany(Friend);
Friend.belongsTo(User);

db.authenticate()
  .then(() => User.sync())
  .then(() => Friend.sync())
  .then(() => {
    console.log('successfully connected to database');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  })

module.exports = db;
