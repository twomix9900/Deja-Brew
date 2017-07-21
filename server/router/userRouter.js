const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/userController.js');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/sendDirections/:phoneNumber', userController.sendDirections);
userRouter.get('/:id', userController.getUserEntry);
userRouter.post('/', userController.addUserEntry);
userRouter.put('/:id', userController.updateUserEntry);
userRouter.delete('/:id', userController.deleteUserEntry);

module.exports = userRouter;
