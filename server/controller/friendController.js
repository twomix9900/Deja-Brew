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
      console.log('exist - so update')
    })
  },

  deleteFriendEntry: (req, res) => {
    console.log('delete friend entry');
  }

}

module.exports = friendController;
