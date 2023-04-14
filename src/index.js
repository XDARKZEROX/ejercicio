const redis = require('redis');
const axios = require('axios');
const constants = require('./constants/constants');
const { scanDynamoRecords, createLogRecord, createDynamoRecord } = require('./database/logs');

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
      let response = JSON.parse(reply)
      axios.post(constants.LAMBDA_API_URL, {
        numOfPlayers: response.numOfPlayers,
        resultString: response.resultString,
        gameNumber: response.gameNumber
      })
      .then(function (response) {
        let params = createLogRecord(response.data.body)
        createDynamoRecord(params)
        console.log(params)
      })
      .catch(function (error) {
       console.log(error);
      });
    })
  });
})
