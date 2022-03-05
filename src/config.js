const dotenv = require("dotenv");
dotenv.config();

const config = {
    mongodb: {
        cnxStr: process.env.mongodb,
        options:{
            autoIndex: false, 
            maxPoolSize: 10, 
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
            family: 4 
          }
    }
}

module.exports = config;
