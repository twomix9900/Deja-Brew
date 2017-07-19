const { BreweryRating } = require ('../db/dbModel.js');

const breweryRatingsController = {

   getBreweryRating: (req, res) => {
    let userId = req.params.id;
    let userBreweryRatingId = req.params.breweryId;
    BreweryRating.findAll({
      where: { breweryId: userBreweryRatingId }
    })
    .then((data) => {
      console.log('*** data received ***', data)
    })
    .catch((err) => {
      console.log('*** error receiving data ***', err)
    })
  },

  updateBreweryRating: (req, res) => {
    BreweryRating.findOne({ where: {
      userId: req.params.id,
      breweryId: req.query.breweryId 
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
          breweryRating: breweryRating
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
