const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const directionController = {

  sendUserDirections: (req, res) => {
    let contactNumber = req.params.phoneNumber.slice(0, 10);
    let queryName = req.params.phoneNumber.slice(10);
    let googleSearch = 'https://www.google.com/maps/dir/?api=1&destination=' + queryName + '&travelmode=driving'
    console.log('inside sendFriendDirections, contactNumber, queryName, googleSearch, req.params.phoneNumber \n', contactNumber, queryName, googleSearch, req.params.phoneNumber)
    
    client.messages.create({
      to: '+1' + contactNumber,
      from: process.env.TWILIO_NUMBER,
      body: 'Directions to ' + req.params.phoneNumber.slice(10).split('+').join(' ') + ': ' + googleSearch
    }, function (err, message) {
      if (err) {
        console.log('error! ', err);
      } else {
        if (message.sid) {
          console.log('message.sid = ', message.sid)
        }
      }
    })
    res.sendStatus(200);  
  },

  sendFriendDirections: (req, res) => {
    console.log('inside sendFriendDirections')
    let contactNumber = req.params.phoneNumber.slice(0, 10);
    let queryName = req.params.phoneNumber.slice(10);
    let googleSearch = 'https://www.google.com/maps/dir/?api=1&destination=' + queryName + '&travelmode=driving'
    
    client.messages.create({
      to: '+1' + contactNumber,
      from: process.env.TWILIO_NUMBER,
      body: 'Please join '+ req.params.user +' for a brew at ' + req.params.phoneNumber.slice(10).split('+').join(' ') + '.  Click link for directions: ' + googleSearch
    }, function (err, message) {
      if (err) {
        console.log('error! ', err);
      } else {
        if (message.sid) {
          console.log('message.sid = ', message.sid)
        }
      }
    })
    res.sendStatus(200);
  }
}

module.exports = directionController;
