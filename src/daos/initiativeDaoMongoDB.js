const ContenedorMongoDb = require("../contenedores/ContenedorMongoDb");

class InitiativeDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('initiatives', {
            initiative: { type: String, required: true },
            fields: [
                {
                    property: { type: String, required: true },
                    access_key: { type: String, required: false },
                }
            ]
        })
    }

    async save(initiative = { initiatives: [] }) {
        return super.save(initiative)
    }
}

module.exports = { InitiativeDaoMongoDb };
