const express = require('express');
const userRouter = express.Router();

const userController = require('../controller/userController.js');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserEntry);
userRouter.post('/', userController.addUserEntry);
userRouter.put('/', userController.updateUserEntry);
userRouter.delete('/:id', userController.deleteUserEntry);

module.exports = userRouter;
