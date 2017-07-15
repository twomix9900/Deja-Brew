const express = require('express');
const s3ImageRouter = express.Router();

const s3ImageController = require('../controller/s3ImageController.js');

s3ImageRouter.get('/:filename/:filetype', s3ImageController.getURL);
//s3ImageRouter.put('/:id', s3ImageController.updateImage);
//s3ImageRouter.delete('/:id', s3ImageController.deleteImage);

module.exports = s3ImageRouter;
