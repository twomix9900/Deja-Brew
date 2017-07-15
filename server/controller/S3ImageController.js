const AWS = require('aws-sdk');
const uuid = require('uuid');
const dotenv = require('dotenv').config();
const { User } = require('../db/dbModel.js');

const bucket = process.env.BUCKET

AWS.config.update({region: 'us-west-2', accessKeyId: process.env.AKID, secretAccessKey: process.env.ASAK });

let s3 = new AWS.S3();

const s3ImageController = {

  getURL: (req, res) => {
  
    let filename = req.params.filename;
    let filetype = 'image/' + req.params.filetype;

    let params = {
      Bucket: process.env.BUCKET,
      Key: filename,
      Expires: 300,
      ContentType: filetype,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        console.log('error updating aws', err);
      } else {
        console.log('url being returned', url);
        res.status(200);
        res.send(url);
      }
    })  
  },

  // updateImage: (req, res) => {
  //   console.log('req info', req.body);
  //   let keyName = 'image-' + uuid.v4();
  //   let params = { Bucket: bucket, Key: keyName, Body: req.body.imageFile, ACL: 'public-read' }
  //   s3.putObject(params, (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.sendStatus(404);
  //     } else {
  //       console.log('successful upload data to ' + bucket + '/' + keyName);
  //       let imageURL = 'https://' + bucket + '.s3.amazonaws.com/' + keyName;
  //       User.update({
  //         image: keyName
  //       }, { where: { 
  //         id: req.params.id 
  //       }})
  //       .then(() => {
  //         res.sendStatus(201);
  //       })
  //       .catch((err) => {
  //         console.log('error creating user image file');
  //         res.sendStatus(400);
  //       })
  //     }
  //   });
  // },

  // deleteImage: (req, res) => {
  //   let params = { Bucket: bucket, Key: req.params.keyName }
  //   s3.deleteObject(params, (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.sendStatus(400);
  //     } else {
  //       console.log('successful deleting image');
  //       User.update({
  //         image: ''
  //       }, { where: {
  //         image: req.params.keyName
  //       }})
  //       .then(() => {
  //         res.sendStatus(200);
  //       })
  //       .catch((err) => {
  //         res.sendStatus(400);
  //       })
  //     }
  //   });
  // }
}

module.exports = s3ImageController;
