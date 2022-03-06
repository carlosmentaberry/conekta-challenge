const { initiativeData } = require("../db/initiativeData")
const { User } = require("../models/user");
const { Initiative, Field } = require("../models/initiative");
const { getClassName, constructors, fixCSV } = require("../utils/objectUtils")
const { initiativeDao } = require('../daos/index');


const getInitiative = async (data) => {
    let initiative = new Initiative();
    let init;
    
    try {
        init = await initiativeDao.listObject('initiative', data.initiative);
    } catch (error) {
        return initiative;
    }

    if (init) {
        initiative.initiative = data.initiative;
        initiative.fields = [];
        let user = new User();

        for (const [key, value] of Object.entries(user)) {
            let obj = new constructors[getClassName(key)]();
            for (const [key, value] of Object.entries(obj)) {
                obj[key] = false;
            }
            user[key] = obj;
        }

        init.fields.forEach(field => {
            if (field.property.includes('.')) {
                let obj = new constructors[getClassName(field.property.split('.')[0])]();
                let nestedObj = new constructors[getClassName(field.property.split('.')[1])]();

                for (const [key, value] of Object.entries(user)) {
                    if (key == field.property.split('.')[0]) {

                        user[key] = new constructors[getClassName(key)]();
                        user[key][field.property.split('.')[1]] = new constructors[getClassName(field.property.split('.')[1])]();
                        for (const [key1, value1] of Object.entries(obj)) {
                            obj[key1] = false;
                        }
                        for (const [key1, value1] of Object.entries(nestedObj)) {

                            if (field.access_key.includes(key1)) {
                                nestedObj[key1] = true;
                            } else {
                                nestedObj[key1] = false;
                            }
                        }
                        user[field.property.split('.')[0]] = obj;
                        user[key][field.property.split('.')[1]] = nestedObj;
                    }
                }
            } else {
                let obj = new constructors[getClassName(field.property)]();

                for (const [key, value] of Object.entries(user)) {
                    if (key == field.property) {
                        if (
                            Object.entries(user[key]).filter(x => x[1]).length < 1
                        ) {
                            user[key] = new constructors[getClassName(key)]();
                            for (const [key1, value1] of Object.entries(obj)) {
                                if (field.access_key.includes(key1)) {
                                    obj[key1] = true;
                                } else if (!obj[key1] && !obj[value1]) {
                                    obj[key1] = false;
                                }
                            }
                            user[field.property] = obj;
                        } else {
                            for (const [key1, value1] of Object.entries(obj)) {
                                if (field.access_key.includes(key1)) {
                                    if (Object.entries(user[key]).filter(x => x[1])[0].filter(x => x == key1).length <= 0) {
                                        obj[key1] = true;
                                    } else if (Object.entries(user[key]).filter(x => x[1])[0].filter(x => x == key1)) {
                                        obj[key1] = user[key][key1];
                                    }
                                } else if (!Object.entries(user[key]).filter(x => x[1])[0].filter(x => x == key1)) {
                                    obj[key1] = false;
                                } else if (Object.entries(user[key]).filter(x => x[1])[0].filter(x => x == key1)) {
                                    obj[key1] = user[key][key1];
                                }
                            }
                            user[field.property] = obj;
                        }
                    }
                }
            }
        });
        initiative.fields.push(user);
        console.log(initiative);
        return initiative;
    }
}

const getInitiatives = async () => {
    return await initiativeDao.listAll();
}

const createInitiative = async (data) => {

    let init = new Initiative("", []);

    if (data.initiative) {
        let ie = await initiativeExists(data.initiative.initiative);
        if (!ie) {
            init.initiative = data.initiative.initiative;
            for (i = 0; i <= data.initiative.fields.length - 1; i++) {

                if (data.initiative.fields[i].property.includes('.')) {
                    let nodeName = getClassName(data.initiative.fields[i].property.split('.')[1]);

                    if (!data.initiative.fields[i].access_key) {
                        for (const [key, value] of Object.entries(new User())) {
                            if (key === data.initiative.fields[i].property.split('.')[0]) {
                                init.fields.push(new Field(data.initiative.fields[i].property, getAccessKeysFromNode(nodeName)));
                            }
                        }
                    } else {
                        let validatedNodeAKs = validateAccessKeysFromNode(data.initiative.fields[i].access_key, nodeName);
                        if (validatedNodeAKs) {
                            init.fields.push(new Field(data.initiative.fields[i].property, validatedNodeAKs));
                        }
                    }
                } else {
                    let nodeName = getClassName(data.initiative.fields[i].property);
                    if (!data.initiative.fields[i].access_key) {
                        for (const [key, value] of Object.entries(new User())) {
                            if (key === data.initiative.fields[i].property) {
                                init.fields.push(new Field(data.initiative.fields[i].property, getAccessKeysFromNode(nodeName)));
                            }
                        }
                    } else {
                        let validatedNodeAKs = validateAccessKeysFromNode(data.initiative.fields[i].access_key, nodeName);
                        if (validatedNodeAKs) {
                            init.fields.push(new Field(data.initiative.fields[i].property, validatedNodeAKs));
                        }
                    }
                }
            }
            return await initiativeDao.save(init);
        }
    }
    return init;
}

const updateInitiative = async (data) => {
    data.initiative = checkPermisions(data.initiative)

    return await initiativeDao.update('initiative', data.initiative.initiative, data.initiative);
}

const checkPermisions = (initiative) => {
    initiative.fields.forEach(field => {
        if (field.property.includes('.')) {
            if (!field.access_key) {
                field.access_key = getAccessKeysFromNode(field.property.split('.')[1]);
            } else {
                let validatedNodeAKs = validateAccessKeysFromNode(field.access_key, field.property.split('.')[1]);
                if (validatedNodeAKs) {
                    field.access_key = validatedNodeAKs;
                }
            }
        } else {
            if (!field.access_key) {
                field.access_key = getAccessKeysFromNode(field.property);
            } else {
                let validatedNodeAKs = validateAccessKeysFromNode(field.access_key, field.property);
                if (validatedNodeAKs) {
                    field.access_key = validatedNodeAKs;
                }
            }
        }
    });
    return initiative;
}
const deleteInitiative = async (data) => {
    await deleteInitiativeDB(data);
    return data;
}

const getAccessKeysFromNode = (classname) => {
    let obj = new constructors[getClassName(classname)]();
    let keys = '';
    for (const [key, value] of Object.entries(obj)) {
        keys += key + ',';
    }
    return fixCSV(keys);
}

const validateAccessKeysFromNode = (accessKeys, node) => {
    let nodeAccessKeys = getAccessKeysFromNode(node);
    let validatedNodeAccessKeys = '';
    if (accessKeys.includes(',')) {
        const accesskeys = accessKeys.split(',');
        accesskeys.forEach(ak => {
            if (nodeAccessKeys.includes(ak)) {
                validatedNodeAccessKeys += ak + ',';
            }
        });
    } else {
        if (nodeAccessKeys.includes(accessKeys)) {
            validatedNodeAccessKeys = accessKeys;
        }
    }

    return fixCSV(validatedNodeAccessKeys);
}

const initiativeExists = async (initiative) => {
    let init
    try {
        init = await initiativeDao.listObject('initiative', initiative);
    } catch (error) {
        return false;
    }
    return true;
}

module.exports = {
    constructors,
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
    deleteInitiative
}