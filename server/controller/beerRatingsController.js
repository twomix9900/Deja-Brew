const { BeerRating } = require ('../db/dbModel.js');

const beerRatingsController = {

  getBeerRating: (req, res) => {
    let userId = req.params.id;
    let userBeerRatingId = req.params.beerId;
    BeerRating.findAll({
      where: { beerId: userBeerRatingId }
    })
    .then((data) => {
      console.log('*** data received ***', data)
    })
    .catch((err) => {
      console.log('*** error receiving data ***', err)
    })
  },

  updateBeerRating: (req, res) => {
    BeerRating.findOne({ where: {
      userId: req.params.id,
      beerId: req.query.beerId 
    }})
    .then((data) => {
      if (data) {
        BeerRating.update({
          beerRating: req.body.beerRating
        }, { where: {
          userId: userId,
          beerId: beerId
        }})
        .then(() => {
          console.log('update successful');
          res.sendStatus(201);
        })
      } else {
        BeerRating.create({
          userId: userId,
          beerId: beerId,
          beerRating: beerRating
        })
        .then(() => {
          console.log('beer rating entry successful');
          res.sendStatus(201);
        })
      }
    })
  }

}

module.exports = beerRatingsController;
