const Sequelize = require('sequelize');
const db = require ('../server/db');
const {
  User,
  Friend,
  Beer,
  Brewery
} = require ('../server/db/dbModel.js');

db.authenticate()
  .then(() => User.sync({ force: true }))
  .then(() => Friend.sync({ force: true }))
  .then(() => Beer.sync({ force: true }))
  .then(() => Brewery.sync({ force: true }))
  .then(() => {
    console.log('successfully reinitialized database');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  })
