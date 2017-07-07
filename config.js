var dotenv = require('dotenv').config()

const dbUrl = process.env.dbUrl;

module.exports = {
  dbUrl: dbUrl,
}
