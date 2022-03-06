const { InitiativeDaoMongoDb } = require('./initiativeDaoMongoDB');

let initiativeDao = new InitiativeDaoMongoDb();

module.exports = { initiativeDao };