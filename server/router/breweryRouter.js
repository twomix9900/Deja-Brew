const express = require('express');
const breweryRouter = express.Router();

const breweryController = require('../controller/breweryController.js');

breweryRouter.get('/breweryLocations', breweryController.getBreweryLocations);

module.exports = breweryRouter;
