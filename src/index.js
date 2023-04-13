const redis = require('redis');
const axios = require('axios');
const constants = require('./constants/constants');


const client = redis.createClient({
  legacyMode: true
})

client.connect().then(async (res) => {
  const keys = await new Promise((resolve, reject) => {
    client.keys('*', (err, keys) => {
      resolve(keys)
    });
  });
  
  keys.forEach(element => {
    client.get(element, function(err, reply){
      let response = JSON.parse(reply);
      axios.post(constants.LAMBDA_API_URL, {
        numOfPlayers: response.numOfPlayers,
        resultString: response.resultString,
        gameNumber: response.gameNumber
      })
      .then(function (response) {
        console.log(response.data.body);
      })
      .catch(function (error) {
       console.log(error);
      });
    })
  });
})



