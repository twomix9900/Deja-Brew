const { User } = require('../db/dbModel.js');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const userController = {

  sendDirections: (req, res) => {
    let contactNumber = req.params.phoneNumber.slice(0, 10);
    let queryName = req.params.phoneNumber.slice(10);
    let googleSearch = 'https://www.google.com/maps/dir/?api=1&destination=' + queryName + '&travelmode=driving'
    console.log('req.params.phoneNumber.slice(0, 10) from sendDirections = ', req.params.phoneNumber.slice(0, 10))
    console.log('req.params.phoneNumber.slice(10) from sendDirections = ', req.params.phoneNumber.slice(10))
    console.log('queryName = ', queryName)
    console.log('contactNumber = ', contactNumber)
    console.log('googleSearch = ', googleSearch)


    client.messages.create({
      to: '+1' + contactNumber,
      from: process.env.TWILIO_NUMBER,
      body: 'Directions to ' + req.params.phoneNumber.slice(10).split('+').join(' ') + ': ' + googleSearch
    }, function (err, message) {
      if (err) {
        console.log('error! ', err);
      } else {
        if (message.sid) {
          console.log('message.sid = ', message.sid)
        }
      }
    })

    res.sendStatus(201);
    
  },

  getAllUsers: (req, res) => {
    User.findAll()
    .then((data) => {
      res.status(200);
      res.json(data);
    })
  },

  getUserEntry: (req, res) => {
    User.findAll({
      where: { auth0Id: req.params.id }
    })
    .then((data) => {
      if (data.length) {
        res.status(200);
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log('error retrieving data', err);
      res.sendStatus(404);
    })    
  },

  addUserEntry: (req, res) => {
    User.findOrCreate({ where: {
      auth0Id: req.body.auth0Id
    },
      defaults: {
        nickname: '',
        image: '',
        email: '',
        phone: ''
      } 
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error creating new user', err);
    })  
  },

  updateUserEntry: (req, res) => {
    User.update({
      nickname: req.body.nickname,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image
    }, { where: {
      id: req.params.id
    }})
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error updating user entry', err);
      res.sendStatus(404);
    })
  },
  
  deleteUserEntry: (req, res) => {
    User.destroy({ where: {
      id: req.params.id
    }})
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error deleting user entry', err);
      res.sendStatus(404);
    })
  }

}

module.exports = userController;
