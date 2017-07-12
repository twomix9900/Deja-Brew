const AWS = require('aws-sdk');
const uuid = require('uuid');
const dotenv = require('dotenv').config();

const bucket = process.env.BUCKET

AWS.config.update({region: 'us-west-2', accessKeyId: process.env.AKID, secretAccessKey: process.env.ASAK });

let s3 = new AWS.S3();

const s3ImageController = {

  getImage: (req, res) => {
    let params = { Bucket: bucket, Key: req.params.keyName }
    s3.getObject(params, (err, data) =>{
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        console.log('returning data', data);
        res.status(200);
        res.send(data);
      }
    })





  },

  updateImage: (req, res) => {
    let params = { Bucket: bucket, Key: req.body.keyName, Body: req.body.imageFile, ACL: 'public-read' }
    s3.putObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        console.log('successful upload data to ' + bucket + '/' + req.body.keyName);
        res.sendStatus(201);
      }
    });
  },

  deleteImage: (req, res) => {
    console.log('under contruction');

  }
}

module.exports = s3ImageController;
