const express = require('express');
const directionRouter = express.Router();

const directionController = require('../controller/directionController.js');

directionRouter.get('/user/:phoneNumber', directionController.sendUserDirections);
directionRouter.get('/friend/:user/:phoneNumber', directionController.sendFriendDirections);

module.exports = directionRouter;
