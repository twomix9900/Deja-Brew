const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const db = require('./server/db');
//const router = require('./server/router');

const app = express();


app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use(cors());

app.use(express.static(path.join(__dirname,'./public')));

const port = 3333;
app.listen(port, function(err) {
  if (err) {
    console.log('unable to connect to port ', port);
  } else {
    console.log('server listening on port ', port, '...');
  }
});

module.exports = app;
