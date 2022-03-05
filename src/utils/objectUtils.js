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
    fixCSV
}