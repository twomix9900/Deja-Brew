const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const db = require('./server/db');
//const router = require('./server/router');

const app = express();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('dev'));

app.use(express.static(path.join(__dirname,'./public')));

module.exports = app;
