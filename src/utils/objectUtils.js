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

const returnInfo = () => {
    return {
        args: process.argv,
        OS: process.platform,
        NodeVersion: process.version,
        ExecPath: process.execPath,
        ProcessId: process.pid,
        ProjectFolder: process.cwd(),
        ReservedMemory: process.memoryUsage().rss
    }
}

const random = (num) => {
    let r = 0;
    let array = [];
    let dict = {};
    for (let i = 0; i <= num; i++) {
        r = Math.trunc(getRandomInt(1, num));
        array.push(r);
    }
    for (var i = 0; i < array.length; i++) {
        dict[array[i]] = dict[array[i]] ? dict[array[i]] + 1 : 1;
    }
    return dict;
}
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
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
    returnInfo,
    random,
    getRandomInt,
    getClassName,
    constructors,
    fixCSV
}