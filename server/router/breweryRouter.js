const express = require('express');
const breweryRouter = express.Router();

const breweryController = require('../controller/breweryController.js');

breweryRouter.get('/breweryLocations/:breweryLat/:breweryLng/:radius', breweryController.getBreweryLocations);
breweryRouter.get('/dejaBrew/:dejaBrew/:currentPage', breweryController.getDejaBrew);
// breweryRouter.get('/breweries/:beerId', breweryController.getBreweriesFromBeerId);
breweryRouter.get('/breweriesLatLng/:breweryLocation', breweryController.getBreweriesLatLng);
breweryRouter.get('/beers/:breweryId', breweryController.getBeersFromBrewery);
breweryRouter.get('/beerStyles', breweryController.getBeerStyles);
breweryRouter.post('/beer', breweryController.postBeer);
breweryRouter.post('/beerDatabase', breweryController.postBeerDatabase);

module.exports = breweryRouter;
