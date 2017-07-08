var axios = require('axios')

const breweryController = {

  getBreweryLocations: (req, res) => {
    console.log('getBreweryLocations server')
    axios.get('https://api.brewerydb.com/v2/locations?locality=anaheim&key=a5ef36e4bb9729811c6360a67f1c227e')
    .then((req) => {
      res.send(req.data)
    })
    .catch((err) => {
      console.log('error getting brew ', err);
      res.sendStatus(400);
    })
  },
}

module.exports = breweryController;