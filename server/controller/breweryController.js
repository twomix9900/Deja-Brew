var axios = require('axios')
const dotenv = require('dotenv').config();
const baseUrl = 'https://api.brewerydb.com/v2/';
const API_KEY = process.env.SEARCH_KEY;
const GOOGLE_LATLNG_KEY = process.env.GOOGLE_PLACE_TO_LAT_LONG_KEY;

const { Beer } = require('../db/dbModel.js');

const breweryController = {

  getBreweryLocations: (req, res) => {
    console.log('getBreweryLocations!! server: ', req.params.breweryLat)
    // /search/geo/point?lat=35.772096&lng=-78.638614
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

  // getBreweriesFromBeerId: (req, res) => {
  //   console.log('getBreweriesFromBeerId server: ', req.params.beerId)
  //   console.log('get url: ' , baseUrl + 'beer/' + req.params.beerId + '/breweries?key=' + API_KEY)
  //   axios.get(baseUrl + 'beer/' + req.params.beerId + '/breweries?key=' + API_KEY)
  //   .then((req) => {
  //     console.log(req.data)
  //     res.send(req.data)
  //   })
  //   .catch((err) => {
  //     console.log('error getting brew ', err);
  //     res.sendStatus(400);
  //   })
  // },

  getBreweriesLatLng: (req, res) => {
    console.log('getBreweriesLatLng server: ', req.params.breweryLocation)
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
    console.log('getBeersFromBrewery server: ', req.params.brewery)
    //https://api.brewerydb.com/v2/brewery/zLQrte/beers?key=a5ef36e4bb9729811c6360a67f1c227e
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
    console.log('getBeerStyles server')
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
    //ex: https://api.brewerydb.com/v2/beers?name=test&styleId=40&description=hello%20there%20this%20is%20a%20beer
    //&abv=6.2&ibu=4.4&key=e9e7adf2a5252e434f812ce8dec22583
    console.log('postBeer server req body: ', req.body)
    let restOfParams = '';
    if(req.body.beerDescription) {
      restOfParams += '&description=' + req.body.beerDescription;
    }
    if(req.body.beerABV) {
      restOfParams += '&abv=' + req.body.beerABV;
    }
    if(req.body.beerIBU) {
      restOfParams += '&ibu=' + req.body.beerIBU;
    }
    if(req.body.breweryAssociated) {
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
    console.log('postBeerDatabase server req.body:' , req.body)
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
  }

}

module.exports = breweryController;