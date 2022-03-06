const asPOJO = obj => JSON.parse(JSON.stringify(obj))
const { User, General_info, Comercial_info, Fiscal_info, Address } = require("../models/user");


const renameField = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}

const removeField = (record, field) => {
    const value = record[field]
    delete record[field]
    return value
}

const getClassName = (propertyName) => {
    return propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
}

const fixCSV = (keys) =>{
    return keys.split(',').filter(Boolean).join(',');
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



const constructors = {
    User: User,
    General_info: General_info,
    Comercial_info: Comercial_info,
    Fiscal_info: Fiscal_info,
    Address: Address
};

module.exports = {
    asPOJO,
    renameField,
    removeField,
    getClassName,
    constructors,
    fixCSV,
    checkPermisions,
    getAccessKeysFromNode,
    validateAccessKeysFromNode
}