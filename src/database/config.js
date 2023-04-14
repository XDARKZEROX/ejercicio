const constants = require('../constants/constants');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: constants.AWS_ACCESS_KEY_ID,
    secretAccessKey: constants.AWS_SECRET_ACCESS_KEY,
    region: 'ca-central-1'
});

const db = new AWS.DynamoDB.DocumentClient();
const Table = 'Log'

module.exports = {
    db: db,
    Table: Table
};