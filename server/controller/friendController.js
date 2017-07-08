const {
  db,
  Friend
 } = require('../db');

const friendController = {

  getAllFriends: (req, res) => {
    console.log('*** get all friends ***');
    res.sendStatus(404);
  },

  getFriendEntry: (req, res) => {
    console.log('get friend entry');
  },

  updateFriendEntry: (req, res) => {
    console.log('update friend entry');
  },

  deleteFriendEntry: (req, res) => {
    console.log('delete friend entry');
  }

}

module.exports = friendController;
