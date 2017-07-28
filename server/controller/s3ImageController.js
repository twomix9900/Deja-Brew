const AWS = require('aws-sdk');
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
        res.status(200);
        res.send(url);
      }
    })  
  },

  deleteImage: (req, res) => {
    let url = 'https://' + bucket + '.s3-us-west-2.amazonaws.com/' + req.params.keyName
    let params = { Bucket: bucket, Key: req.params.keyName }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        User.update({
          image: ''
        }, { where: {
          image: url
        }})
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(400);
        })
      }
    });
  }
}

module.exports = s3ImageController;
