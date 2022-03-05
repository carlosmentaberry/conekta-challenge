const mongoose = require('mongoose');
const config = require('../config.js');
const { asPOJO, renameField, removeField } = require('../utils/objectUtils.js');

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listObject(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 });
            if (docs.length == 0) {
                throw new Error('Error listing object, id not found');
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id');
                return result;
            }
        } catch (error) {
            throw new Error(`Error listing object by id: ${error}`);
        }
    }

    async listObject(param, value) {
        try {
            const docs = await this.coleccion.find({ param: value }, { __v: 0 });
            if (docs.length == 0) {
                throw new Error(`Error listing object by ${param}: object not found`);
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id');
                return result;
            }
        } catch (error) {
            throw new Error(`Error listing object by ${param}:  ${error}`);
        }
    }

    async listAll() {
        try {
            let docs = await this.coleccion.find({}, { __v: 0 }).lean();
            docs = docs.map(asPOJO);
            docs = docs.map(d => renameField(d, '_id', 'id'));
            return docs;
        } catch (error) {
            throw new Error(`Error listing all ojbects: ${error}`);
        }
    }

    async save(nuevoElem) {
        try {
            let doc = await this.coleccion.create(nuevoElem);
            doc = asPOJO(doc);
            renameField(doc, '_id', 'id');
            removeField(doc, '__v');
            return doc;
        } catch (error) {
            throw new Error(`Error saving object: ${error}`);
        }
    }

    async update(nuevoElem) {
        try {
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem);
            if (n == 0 || nModified == 0) {
                throw new Error('Error updating object by id: object not found');
            } else {
                renameField(nuevoElem, '_id', 'id');
                removeField(nuevoElem, '__v');
                return asPOJO(nuevoElem);
            }
        } catch (error) {
            throw new Error(`Error updating object: ${error}`);
        }
    }

    async update(param, value, nuevoElem) {
        try {
            let obj = await this.listObject(param, value);
            if (obj) {
                const { n, nModified } = await this.coleccion.replaceOne({ '_id': obj.id }, nuevoElem);
                if (n == 0 || nModified == 0) {
                    throw new Error(`Error updating object by ${param}: object not found`);
                } else {
                    renameField(nuevoElem, '_id', 'id');
                    removeField(nuevoElem, '__v');
                    return asPOJO(nuevoElem);
                }
            } else {
                throw new Error(`Error updating object by ${param}: object not found`);
            }
        } catch (error) {
            throw new Error(`Error updating object by ${param}:  ${error}`);
        }
    }

    async delete(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id });
            if (n == 0 || nDeleted == 0) {
                throw new Error(`Error deleting object by id: object not found`);
            }
        } catch (error) {
            throw new Error(`Error deleting object: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({});
        } catch (error) {
            throw new Error(`Error deleting all objects: ${error}`);
        }
    }
}

module.exports = ContenedorMongoDb;