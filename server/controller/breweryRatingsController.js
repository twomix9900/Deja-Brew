const { BreweryRating } = require ('../db/dbModel.js');

const breweryRatingsController = {

   getBreweryRating: (req, res) => {
    let userBreweryRatingId = req.params.breweryId;
    BreweryRating.findAll({
      where: { breweryId: userBreweryRatingId }
    })
    .then((data) => {
      let breweryRatingInfo = [];
      for (let idx = 0; idx < data.length; idx ++) {
        breweryRatingInfo.push(data[idx].dataValues);
      }
      console.log('*** data received ***');
      res.json(breweryRatingInfo);
    })
    .catch((err) => {
      console.log('*** error receiving data ***', err);
      res.sendStatus(404);
    })
  },

  updateBreweryRating: (req, res) => {
    let userId = req.params.id;
    let breweryId = req.query.breweryId;
    BreweryRating.findOne({ where: {
      userId: userId,
      breweryId: breweryId
    }})
    .then((data) => {
      if (data) {
        BreweryRating.update({
          breweryRating: req.body.breweryRating
        }, { where: {
          userId: userId,
          breweryId: breweryId
        }})
        .then(() => {
          console.log('update successful');
          res.sendStatus(201);
        })
      } else {
        BreweryRating.create({
          userId: userId,
          breweryId: breweryId,
          breweryRating: req.body.breweryRating
        })
        .then(() => {
          console.log('brewery rating entry successful');
          res.sendStatus(201);
        })
      }
    })
  }

}

module.exports = breweryRatingsController;
