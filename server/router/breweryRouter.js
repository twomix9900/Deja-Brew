const express = require('express');
const breweryRouter = express.Router();

const breweryController = require('../controller/breweryController.js');

breweryRouter.get('/breweryLocations/:location', breweryController.getBreweryLocations);
breweryRouter.get('/dejaBrew/:dejaBrew/:currentPage', breweryController.getDejaBrew);
breweryRouter.get('/breweries/:beerId', breweryController.getBreweriesFromBeerId);
// breweryRouter.get('/brewery/:breweryId', breweryController.getBreweryFromBreweryId);

module.exports = breweryRouter;
