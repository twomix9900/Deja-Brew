const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./server/db');
const {
  User,
  Friend,
  BreweryRating,
  BeerRating
} = require('./server/db/dbModel.js')

const userRouter = require('./server/router/userRouter.js');
const friendRouter = require('./server/router/friendRouter.js');
const breweryRouter = require('./server/router/breweryRouter.js');
const s3ImageRouter = require('./server/router/s3ImageRouter.js');
const breweryRatingsRouter = require('./server/router/breweryRatingsRouter.js');
const beerRatingsRouter = require('./server/router/beerRatingsRouter');
const cors = require('cors');

const app = express();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use(cors());

app.use(express.static(path.join(__dirname,'./public')));

app.use('/users', userRouter);
app.use('/friends', friendRouter);
app.use('/brewery', breweryRouter);
app.use('/images', s3ImageRouter);
app.use('/breweryRatings', breweryRatingsRouter);
app.use('/beerRatings', beerRatingsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

db.authenticate()
  .then(() => User.sync())
  .then(() => Friend.sync())
  .then(() => BreweryRating.sync())
  .then(() => BeerRating.sync()) 
  .then(() => {
    console.log('successfully connected to database');
  })
  .catch((err) => {
    console.log('error connecting to database', err);
  })

const port = 3333;
app.listen(port, function(err) {
  if (err) {
    console.log('unable to connect to port ', port);
  } else {
    console.log('server listening on port ', port, '...');
  }
});

module.exports = app;
