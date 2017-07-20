const Sequelize = require('sequelize');
const db = require ('../server/db');
const {
  User,
  Friend,
  BreweryRating,
  BeerRating
} = require ('../server/db/dbModel.js');

db.authenticate()
  .then(() => User.sync({ force: true }))
  .then(() => Friend.sync({ force: true }))
  .then(() => BreweryRating.sync({ force: true }))
  .then(() => BeerRating.sync({ force: true }))
  .then(() => {
    console.log('successfully reinitialized database');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  })
