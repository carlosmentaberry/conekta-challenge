const ContenedorMongoDb = require("../contenedores/ContenedorMongoDb.js");

class UserDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('user', {
            users: { type: [], required: true }
        })
    }

    async guardar(user = { users: [] }) {
        return super.guardar(user)
    }
}

module.exports = { UserDaoMongoDb };
