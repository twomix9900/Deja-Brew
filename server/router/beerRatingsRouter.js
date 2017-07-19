const express = require('express');
const beerRatingsRouter = express.Router();

const beerRatingsController = require('../controller/beerRatingsController.js');

beerRatingsRouter.get('/:id/:beerId', beerRatingsController.getBeerRating);
beerRatingsRouter.put('/:id', beerRatingsController.updateBeerRating);

module.exports = beerRatingsRouter;
