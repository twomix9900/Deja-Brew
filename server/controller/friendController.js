const { Friend } = require('../db/dbModel.js');

const friendController = {

  getAllFriends: (req, res) => {
    Friend.findAll({ where : {
      userId: req.params.userId
    }})
    .then((data) => {
      res.status(200);
      res.json(data);
    })
  },

  getFriendEntry: (req, res) => {
    Friend.findAll({ where: {
      userId: req.params.userId,
      id: req.params.id
    }})
    .then((data) => {
      res.status(200);
      res.json(data);
    })
  },

  updateFriendEntry: (req, res) => {
    Friend.findOne({ where: {
      userId: req.params.userId,
      id: req.query.id
    }})
    .then((data) => {
      if (data) {
        Friend.update({
          name: req.body.name,
          phone: req.body.phone
        }, { where: {
          userId: req.params.userId,
          id: req.query.id
        }})
        .then(() => {
          console.log('update successful');
          res.sendStatus(200);
        })
      } else {
        Friend.create({
          name: req.body.name,
          phone: req.body.phone,
          userId: req.params.userId
        })
        .then(() => {
          console.log('friend successfully created');
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
    Friend.destroy({ where: {
      userId: req.params.userId,
      id: req.params.id
    }})
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error deleting friend entry', err);
      res.sendStatus(404);
    })
  },

  sendDirections: (req, res) => {
    let contactNumber = req.params.phoneNumber.slice(0, 10);
    let queryName = req.params.phoneNumber.slice(10);
    let googleSearch = 'https://www.google.com/maps/dir/?api=1&destination=' + queryName + '&travelmode=driving'
    
    client.messages.create({
      to: '+1' + contactNumber,
      from: process.env.TWILIO_NUMBER,
      body: 'Please join me at ' + queryName +'.\nDirections to ' + req.params.phoneNumber.slice(10).split('+').join(' ') + ': ' + googleSearch
    }, function (err, message) {
      if (err) {
        console.log('error! ', err);
      } else {
        if (message.sid) {
          console.log('message.sid = ', message.sid)
        }
      }
    })
    res.sendStatus(200);
  }
}

module.exports = friendController;
