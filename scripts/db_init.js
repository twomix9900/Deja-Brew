const Sequelize = require('sequelize');
const db = require ('../server/db');
const {
  User,
  Friend,
<<<<<<< HEAD
  Beer,
  Brewery
=======
  BreweryRating,
  BeerRating
>>>>>>> master
} = require ('../server/db/dbModel.js');

db.authenticate()
  .then(() => User.sync({ force: true }))
  .then(() => Friend.sync({ force: true }))
<<<<<<< HEAD
  .then(() => Beer.sync({ force: true }))
  .then(() => Brewery.sync({ force: true }))
=======
  .then(() => BreweryRating.sync({ force: true }))
  .then(() => BeerRating.sync({ force: true }))
>>>>>>> master
  .then(() => {
    console.log('successfully reinitialized database');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  })
