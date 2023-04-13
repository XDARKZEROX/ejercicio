const {db, Table} = require('./config');

function scanDynamoRecords() {
    const params = {
        TableName: Table
    }
    return new Promise((resolve, reject) => {
        db.scan(params, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

function createDynamoRecord(params){
    return new Promise((resolve, reject) => {
        db.put(params, function(err, data) {
            if (err) {
               console.error("Unable to create item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                resolve(data)
            }
        });
  })
}

function createLogRecord(value){
    return {
        TableName: Table,
        Item: {
          Id: generateUUID(),
          text: value
        }
      };
}

function generateUUID() {
    return  (Math.random()).toString()
}

module.exports = {
    scanDynamoRecords,
    createLogRecord,
    createDynamoRecord
}

