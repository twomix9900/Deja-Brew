const express = require('express');
const breweryRouter = express.Router();

const breweryController = require('../controller/breweryController.js');

breweryRouter.get('/breweryLocations/:breweryLat/:breweryLng', breweryController.getBreweryLocations);
breweryRouter.get('/dejaBrew/:dejaBrew/:currentPage', breweryController.getDejaBrew);
breweryRouter.get('/breweries/:beerId', breweryController.getBreweriesFromBeerId);
breweryRouter.get('/breweriesLatLng/:breweryLocation', breweryController.getBreweriesLatLng);

module.exports = breweryRouter;
