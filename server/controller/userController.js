const {
  db,
  User
 } = require('../db');

const userController = {

  getAllUsers: (req, res) => {
    console.log('*** get all users ***');
    res.sendStatus(404);
  },

  getUserEntry: (req, res) => {
    console.log('get user entry');
  },

  addUserEntry: (req, res) => {
    console.log('create user entry');
    let nickname = req.body.nickname;
    let email = req.body.email;
    let phone = req.body.phone;
    console.log('req body', req.body);
    User.create({
      nickname: nickname,
      email: email,
      phone: phone
    })
    .then(() => {
      console.log('successfully added entry');
      res.sendStatus(201);
    })
    
  },

  updateUserEntry: (req, res) => {
    console.log('update user entry');
  },
  
  deleteUserEntry: (req, res) => {
    console.log('delete user entry');
  }

}

module.exports = userController;
