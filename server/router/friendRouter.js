const express = require('express');
const friendRouter = express.Router();

const friendController = require('../controller/friendController.js');

friendRouter.get('/:userId', friendController.getAllFriends);
friendRouter.get('/:userId/:id', friendController.getFriendEntry);
friendRouter.get('/sendDirections/:phoneNumber', friendController.sendDirections);
friendRouter.put('/:userId', friendController.updateFriendEntry);
friendRouter.delete('/:userId/:id', friendController.deleteFriendEntry);

module.exports = friendRouter;
