const express = require('express');
const s3ImageRouter = express.Router();

const s3ImageController = require('../controller/s3ImageController.js');

s3ImageRouter.get('/:keyName', s3ImageController.getImage);
s3ImageRouter.put('/', s3ImageController.updateImage);
s3ImageRouter.delete('/:keyName', s3ImageController.deleteImage);

module.exports = s3ImageRouter;
