'use strict';

var Sequelize = require('sequelize');
// const config = require('../../config.js');
var dotenv = require('dotenv').config();

var db = new Sequelize(process.env.DB_URL, {
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

var User = db.define('user', {
  nickname: Sequelize.STRING(32),
  email: Sequelize.STRING(64),
  phone: Sequelize.INTEGER
});

var Friend = db.define('friend', {
  name: Sequelize.STRING(32),
  phone: Sequelize.INTEGER
});

User.hasMany(Friend);
Friend.belongsTo(User);

db.authenticate().then(function () {
  return User.sync();
}).then(function () {
  return Friend.sync();
}).then(function () {
  console.log('successfully connected to database');
}).catch(function (err) {
  console.log('error connecting to database', err);
});

module.exports = db;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJTZXF1ZWxpemUiLCJyZXF1aXJlIiwiZG90ZW52IiwiY29uZmlnIiwiZGIiLCJwcm9jZXNzIiwiZW52IiwiREJfVVJMIiwicG9vbCIsIm1heCIsIm1pbiIsImlkbGUiLCJVc2VyIiwiZGVmaW5lIiwibmlja25hbWUiLCJTVFJJTkciLCJlbWFpbCIsInBob25lIiwiSU5URUdFUiIsIkZyaWVuZCIsIm5hbWUiLCJoYXNNYW55IiwiYmVsb25nc1RvIiwiYXV0aGVudGljYXRlIiwidGhlbiIsInN5bmMiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjtBQUNBO0FBQ0EsSUFBSUMsU0FBU0QsUUFBUSxRQUFSLEVBQWtCRSxNQUFsQixFQUFiOztBQUVBLElBQU1DLEtBQUssSUFBSUosU0FBSixDQUFjSyxRQUFRQyxHQUFSLENBQVlDLE1BQTFCLEVBQWtDO0FBQ3pDQyxRQUFNO0FBQ0pDLFNBQUssQ0FERDtBQUVKQyxTQUFLLENBRkQ7QUFHSkMsVUFBTTtBQUhGO0FBRG1DLENBQWxDLENBQVg7O0FBU0EsSUFBTUMsT0FBT1IsR0FBR1MsTUFBSCxDQUFVLE1BQVYsRUFBa0I7QUFDN0JDLFlBQVVkLFVBQVVlLE1BQVYsQ0FBaUIsRUFBakIsQ0FEbUI7QUFFN0JDLFNBQU9oQixVQUFVZSxNQUFWLENBQWlCLEVBQWpCLENBRnNCO0FBRzdCRSxTQUFPakIsVUFBVWtCO0FBSFksQ0FBbEIsQ0FBYjs7QUFNQSxJQUFNQyxTQUFTZixHQUFHUyxNQUFILENBQVUsUUFBVixFQUFvQjtBQUNqQ08sUUFBTXBCLFVBQVVlLE1BQVYsQ0FBaUIsRUFBakIsQ0FEMkI7QUFFakNFLFNBQU9qQixVQUFVa0I7QUFGZ0IsQ0FBcEIsQ0FBZjs7QUFLQU4sS0FBS1MsT0FBTCxDQUFhRixNQUFiO0FBQ0FBLE9BQU9HLFNBQVAsQ0FBaUJWLElBQWpCOztBQUVBUixHQUFHbUIsWUFBSCxHQUNHQyxJQURILENBQ1E7QUFBQSxTQUFNWixLQUFLYSxJQUFMLEVBQU47QUFBQSxDQURSLEVBRUdELElBRkgsQ0FFUTtBQUFBLFNBQU1MLE9BQU9NLElBQVAsRUFBTjtBQUFBLENBRlIsRUFHR0QsSUFISCxDQUdRLFlBQU07QUFDVkUsVUFBUUMsR0FBUixDQUFZLG9DQUFaO0FBQ0QsQ0FMSCxFQU1HQyxLQU5ILENBTVMsVUFBQ0MsR0FBRCxFQUFTO0FBQ2RILFVBQVFDLEdBQVIsQ0FBWSw4QkFBWixFQUE0Q0UsR0FBNUM7QUFDRCxDQVJIOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCM0IsRUFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbi8vIGNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qcycpO1xudmFyIGRvdGVudiA9IHJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpXG5cbmNvbnN0IGRiID0gbmV3IFNlcXVlbGl6ZShwcm9jZXNzLmVudi5EQl9VUkwsIHtcbiAgICBwb29sOiB7XG4gICAgICBtYXg6IDEsXG4gICAgICBtaW46IDAsXG4gICAgICBpZGxlOiAxMDAwMFxuICAgIH1cbiAgfVxuKTtcblxuY29uc3QgVXNlciA9IGRiLmRlZmluZSgndXNlcicsIHtcbiAgbmlja25hbWU6IFNlcXVlbGl6ZS5TVFJJTkcoMzIpLFxuICBlbWFpbDogU2VxdWVsaXplLlNUUklORyg2NCksXG4gIHBob25lOiBTZXF1ZWxpemUuSU5URUdFUlxufSk7XG5cbmNvbnN0IEZyaWVuZCA9IGRiLmRlZmluZSgnZnJpZW5kJywge1xuICBuYW1lOiBTZXF1ZWxpemUuU1RSSU5HKDMyKSxcbiAgcGhvbmU6IFNlcXVlbGl6ZS5JTlRFR0VSXG59KTtcblxuVXNlci5oYXNNYW55KEZyaWVuZCk7XG5GcmllbmQuYmVsb25nc1RvKFVzZXIpO1xuXG5kYi5hdXRoZW50aWNhdGUoKVxuICAudGhlbigoKSA9PiBVc2VyLnN5bmMoKSlcbiAgLnRoZW4oKCkgPT4gRnJpZW5kLnN5bmMoKSlcbiAgLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsbHkgY29ubmVjdGVkIHRvIGRhdGFiYXNlJyk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yIGNvbm5lY3RpbmcgdG8gZGF0YWJhc2UnLCBlcnIpO1xuICB9KVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuIl19