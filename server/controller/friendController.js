const {
  db,
  Friend
 } = require('../db');

const friendController = {

  getAllFriends: (req, res) => {
    console.log('*** get all friends ***');
    Friend.findAll({ where : {
      userId: req.params.userId
    }})
    .then((data) => {
      res.status(200);
      res.json(data);
    })
  },

  getFriendEntry: (req, res) => {
    console.log('get friend entry');
  },

  updateFriendEntry: (req, res) => {
    console.log('update friend entry');
    Friend.findOne({ where: {
      userId: req.params.userId,
      id: req.params.id
    }})
    .then((data) => {
      if (data) {
        console.log('i exist - so update');
        Friend.update({
          name: req.body.name,
          phone: req.body.phone
        }, { where: {
          userId: req.params.userId,
          id: req.params.id
        }})
        .then(() => {
          console.log('update successful');
          res.sendStatus(200);
        })
      } else {
        console.log('i do not exist - so create');
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
  }

}

module.exports = friendController;
