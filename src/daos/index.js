
const { UserDaoMongoDb } = require('./userDaoMongoDB.js');
const { InitiativeDaoMongoDb } = require('./initiativeDaoMongoDB');

let userDao = new UserDaoMongoDb();
let initiativeDao = new InitiativeDaoMongoDb();

module.exports = { userDao, initiativeDao };