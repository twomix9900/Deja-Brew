const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/userController.js');

userRouter.get('/users', userController.GET_ALLUSERS);
userRouter.get('/users/:id', userController.GET_USERENTRY);
userRouter.post('/users', userController.CREATE_USERENTRY);
userRouter.put('/users/:id', userController.UPDATE_USERENTRY);
userRouter.get('/friends', userController.GET_ALLFRIENDS);
userRouter.get('/friends/:id', userController.GET_FRIENDENTRY);
userRouter.put('/friends', userController.UPDATE_FRIENDENTRY);

module.exports = userRouter;

