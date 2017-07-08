const express = require('express');
const friendRouter = express.Router();

const friendController = require('../controller/friendController.js');

friendRouter.get('/', friendController.getAllFriends);
friendRouter.get('/:id', friendController.getFriendEntry);
friendRouter.put('/', friendController.updateFriendEntry);
friendRouter.delete('/:id', friendController.deleteFriendEntry);

module.exports = friendRouter;
