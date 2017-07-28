const express = require('express');
const breweryRouter = express.Router();

const breweryController = require('../controller/breweryController.js');

breweryRouter.get('/breweryLocations/:breweryLat/:breweryLng/:radius', breweryController.getBreweryLocations);
breweryRouter.get('/dejaBrew/:dejaBrew/:currentPage', breweryController.getDejaBrew);
breweryRouter.get('/breweriesLatLng/:breweryLocation', breweryController.getBreweriesLatLng);
breweryRouter.get('/beers/:breweryId', breweryController.getBeersFromBrewery);
breweryRouter.get('/beerStyles', breweryController.getBeerStyles);
breweryRouter.post('/beer', breweryController.postBeer);
breweryRouter.post('/beerDatabase', breweryController.postBeerDatabase);
breweryRouter.post('/brewery', breweryController.postBrewery);
breweryRouter.post('/breweryDatabase', breweryController.postBreweryDatabase);
breweryRouter.get('/beerStatus/:userId', breweryController.getBeerStatus);
breweryRouter.get('/breweryStatus/:userId', breweryController.getBreweryStatus);
breweryRouter.get('/beerStatusAPI/:beerId', breweryController.getBeerStatusAPI);
breweryRouter.get('/breweryStatusAPI/:breweryId', breweryController.getBreweryStatusAPI);

module.exports = breweryRouter;
