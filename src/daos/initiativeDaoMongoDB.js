const ContenedorMongoDb = require("../contenedores/ContenedorMongoDb.js");
const { Field } = require("../models/initiative.js");

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

    async guardar(initiative = { initiatives: [] }) {
        return super.guardar(initiative)
    }
}

module.exports = { InitiativeDaoMongoDb };
