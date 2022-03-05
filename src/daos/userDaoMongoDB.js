const ContenedorMongoDb = require("../contenedores/ContenedorMongoDb.js");

class UserDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('user', {
            users: { type: [], required: true }
        })
    }

    async save(user = { users: [] }) {
        return super.save(user)
    }
}

module.exports = { UserDaoMongoDb };
