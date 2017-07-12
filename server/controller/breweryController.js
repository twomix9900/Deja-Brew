var axios = require('axios')
const dotenv = require('dotenv').config();
const baseUrl = 'https://api.brewerydb.com/v2/';
const API_KEY = process.env.SEARCH_KEY;

const breweryController = {

  getBreweryLocations: (req, res) => {
    console.log('getBreweryLocations server: ', req.params.location)
    axios.get(baseUrl + 'locations?locality=' + req.params.location + '&key=' + API_KEY)
    .then((req) => {
      res.send(req.data)
    })
    .catch((err) => {
      console.log('error getting brew ', err);
      res.sendStatus(400);
    })
  },

  getDejaBrew: (req, res) => {
    var currentPage = parseInt(req.params.currentPage)
    axios.get(baseUrl + 'search?q=' + req.params.dejaBrew + '&p=' + currentPage + '&withBreweries=Y&withLocations=Y&key=' + API_KEY)
    .then((req) => {
      res.send(req.data)
    })
    .catch((err) => {
      console.log('error getting brew ', err);
      res.sendStatus(400);
    })
  },

  getBreweriesFromBeerId: (req, res) => {
    console.log('getBreweriesFromBeerId server: ', req.params.beerId)
    console.log('get url: ' , baseUrl + 'beer/' + req.params.beerId + '/breweries?key=' + API_KEY)
    axios.get(baseUrl + 'beer/' + req.params.beerId + '/breweries?key=' + API_KEY)
    .then((req) => {
      console.log(req.data)
      res.send(req.data)
    })
    .catch((err) => {
      console.log('error getting brew ', err);
      res.sendStatus(400);
    })
  },



}

module.exports = breweryController;