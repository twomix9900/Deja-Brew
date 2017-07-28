const { Friend } = require('../db/dbModel.js');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const friendController = {

  getAllFriends: (req, res) => {
    Friend.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then((data) => {
        res.status(200);
        res.json(data);
      })
  },

  getFriendEntry: (req, res) => {
    Friend.findAll({
      where: {
        userId: req.params.userId,
        id: req.params.id
      }
    })
      .then((data) => {
        res.status(200);
        res.json(data);
      })
  },

  updateFriendEntry: (req, res) => {
    Friend.findOne({
      where: {
        userId: req.params.userId,
        id: req.query.id
      }
    })
      .then((data) => {
        if (data) {
          Friend.update({
            name: req.body.name,
            phone: req.body.phone
          }, {
            where: {
              userId: req.params.userId,
              id: req.query.id
            }
            })
            .then(() => {
              res.sendStatus(200);
            })
        } else {
          Friend.create({
            name: req.body.name,
            phone: req.body.phone,
            userId: req.params.userId
          })
            .then(() => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.log('error creating friend', err);
              res.sendStatus(400);
            })
        }
      })
  },

  deleteFriendEntry: (req, res) => {
    console.log('delete friend entry');
    Friend.destroy({
      where: {
        userId: req.params.userId,
        id: req.params.id
      }
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error deleting friend entry', err);
        res.sendStatus(404);
      })
  },
}

module.exports = friendController;
