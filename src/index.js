const redis = require('redis');

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
      console.log(reply)
    })
  });

})



