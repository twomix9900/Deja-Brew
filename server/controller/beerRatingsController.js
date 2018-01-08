const { BeerRating } = require('../db/dbModel.js');

const beerRatingsController = {

  getBeerRating: (req, res) => {
    let userBeerRatingId = req.params.beerId;
    BeerRating.findAll({
      where: { beerId: userBeerRatingId }
    })
      .then((data) => {
        let beerRatingInfo = [];
        for (let idx = 0; idx < data.length; idx++) {
          beerRatingInfo.push(data[idx].dataValues);
        }
        res.json(beerRatingInfo);
      })
      .catch((err) => {
        res.sendStatus(404);
      })
  },

  updateBeerRating: (req, res) => {
    let userId = req.params.id;
    let beerId = req.query.beerId;
    BeerRating.findOne({
      where: {
        userId: userId,
        beerId: beerId
      }
    })
      .then((data) => {
        if (data) {
          BeerRating.update({
            beerRating: req.body.beerRating
          }, {
            where: {
              userId: userId,
              beerId: beerId
            }
            })
            .then(() => {
              res.sendStatus(201);
            })
        } else {
          BeerRating.create({
            userId: userId,
            beerId: beerId,
            beerRating: req.body.beerRating
          })
            .then(() => {
              res.sendStatus(201);
            })
        }
      })
  }
}

module.exports = beerRatingsController;
