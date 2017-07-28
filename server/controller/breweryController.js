var axios = require('axios')
const dotenv = require('dotenv').config();
const baseUrl = 'https://api.brewerydb.com/v2/';
const API_KEY = process.env.SEARCH_KEY;
const GOOGLE_LATLNG_KEY = process.env.GOOGLE_PLACE_TO_LAT_LONG_KEY;
const { Beer } = require('../db/dbModel.js');
const { Brewery } = require('../db/dbModel.js');
const breweryController = {

  getBreweryLocations: (req, res) => {
    axios.get(baseUrl + '/search/geo/point?lat=' + req.params.breweryLat +
      '&lng=' + req.params.breweryLng + '&radius=' + req.params.radius + '&key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getBreweryLocations ', err);
        res.sendStatus(400);
      })
  },

  getDejaBrew: (req, res) => {
    var currentPage = parseInt(req.params.currentPage)
    axios.get(baseUrl + 'search?q=' + req.params.dejaBrew + '&p=' + currentPage
      + '&withBreweries=Y&withLocations=Y&key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getDejaBrew ', err);
        res.sendStatus(400);
      })
  },

  getBreweriesLatLng: (req, res) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='
      + req.params.breweryLocation + '&key=' + GOOGLE_LATLNG_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getBreweriesLatLng ', err);
        res.sendStatus(400);
      })
  },

  getBeersFromBrewery: (req, res) => {
    axios.get(baseUrl + 'brewery/' + req.params.breweryId + '/beers?key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getBeersFromBrewery ', err);
        res.sendStatus(400);
      })
  },

  getBeerStyles: (req, res) => {
    axios.get(baseUrl + 'styles?key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getBeerStyles ', err);
        res.sendStatus(400);
      })
  },

  postBeer: (req, res) => {
    let restOfParams = '';
    if (req.body.beerDescription) {
      restOfParams += '&description=' + req.body.beerDescription;
    }
    if (req.body.beerABV) {
      restOfParams += '&abv=' + req.body.beerABV;
    }
    if (req.body.beerIBU) {
      restOfParams += '&ibu=' + req.body.beerIBU;
    }
    if (req.body.breweryAssociated) {
      restOfParams += '&brewery=' + req.body.breweryAssociated;
    }

    axios.post(baseUrl + 'beers?name=' + req.body.beerName + '&styleId=' +
      req.body.beerStyleId + restOfParams + '&key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting postBeer ', err);
        res.sendStatus(400);
      })
  },

  postBeerDatabase: (req, res) => {
    Beer.create({
      uniqId: req.body.beerId,
      userId: req.body.userId
    })
      .then(() => {
        console.log('Beer successfully created');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error creating friend', err);
        res.sendStatus(400);
      })
  },

  postBrewery: (req, res) => {
    let restOfParams = '';
    if (req.body.breweryDescription) {
      restOfParams += '&description=' + req.body.breweryDescription;
    }
    if (req.body.breweryWebsite) {
      restOfParams += '&brewery=' + req.body.breweryWebsite;
    }
    axios.post(baseUrl + 'breweries?name=' + req.body.breweryName + restOfParams + '&key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting postBeer ', err);
        res.sendStatus(400);
      })
  },

  postBreweryDatabase: (req, res) => {
    Brewery.create({
      uniqId: req.body.breweryId,
      userId: req.body.userId
    })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error creating friend', err);
        res.sendStatus(400);
      })
  },

  getBeerStatus: (req, res) => {
    Beer.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then((data) => {
        res.status(200);
        res.json(data);
      })
  },

  getBreweryStatus: (req, res) => {
    Brewery.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then((data) => {
        res.status(200);
        res.json(data);
      })
  },

  getBeerStatusAPI: (req, res) => {
    axios.get(baseUrl + 'beer/' + req.params.beerId + '?key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getBeerStyles ', err);
        res.sendStatus(400);
      })
  },

  getBreweryStatusAPI: (req, res) => {
    axios.get(baseUrl + 'brewery/' + req.params.breweryId + '?key=' + API_KEY)
      .then((req) => {
        res.send(req.data)
      })
      .catch((err) => {
        console.log('error getting getBeerStyles ', err);
        res.sendStatus(400);
      })
  }



}

module.exports = breweryController;