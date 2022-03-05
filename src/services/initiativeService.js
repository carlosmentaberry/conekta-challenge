const { getInitiativeDB, getInitiativesDB, saveInitiativeDB, updateInitiativeDB, deleteInitiativeDB, initiativeData } = require("../db/initiativeData")
const { User, General_info, Comercial_info, Fiscal_info, Address } = require("../models/user");
const { Initiative, Field } = require("../models/initiative");

const getInitiative = async (data) => {
    let init = await getInitiativeDB(data);
    if (init) {
        let initiative = new Initiative();
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
                let obj1 = new constructors[getClassName(field.property.split('.')[0])]();
                let obj2 = new constructors[getClassName(field.property.split('.')[1])]();

                for (const [key, value] of Object.entries(user)) {
                    if (key == field.property.split('.')[0]) {

                        user[key] = new constructors[getClassName(key)]();
                        user[key][field.property.split('.')[1]] = new constructors[getClassName(field.property.split('.')[1])]();
                        for (const [key2, value2] of Object.entries(obj1)) {
                            obj1[key2] = false;
                        }
                        for (const [key1, value1] of Object.entries(obj2)) {

                            if (field.access_key.includes(key1)) {
                                obj2[key1] = true;
                            } else {
                                obj2[key1] = false;
                            }
                        }
                        user[field.property.split('.')[0]] = obj1;
                        user[key][field.property.split('.')[1]] = obj2;
                    }
                }
            } else {
                let obj = new constructors[getClassName(field.property)]();

                for (const [key, value] of Object.entries(user)) {
                    if (key == field.property) {
                        console.log(Object.entries(user[key]).filter(x => x[1]));
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
                        }else {
                            for (const [key1, value1] of Object.entries(obj)) {
                                if (field.access_key.includes(key1)) {
                                    obj[key1] = true;
                                } else if (!Object.entries(user[key]).filter(x => x[1])[0].filter(x => x == key1)) {
                                    obj[key1] = false;
                                }else if (Object.entries(user[key]).filter(x => x[1])[0].filter(x => x == key1)) {
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
        return initiative;
    }
}

const getInitiatives = async () => {
    return await getInitiativesDB();
}

const createInitiative = async (data) => {

    let init = new Initiative("", []);

    if (data.initiative) {
        if (initiativeExists(data.initiative.initiative)) {
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
        }
    }
    await saveInitiativeDB(init);
    return init;
}

const updateInitiative = async (data) => {
    let init = await getInitiative(data.initiative);
    data.initiative = checkPermisions(data.initiative)

    return await updateInitiativeDB(init, data.initiative);
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
        }else{
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
    for (const [key1, value1] of Object.entries(obj)) {
        keys += key1 + ',';
    }
    return keys.split(',').filter(Boolean).join(',');
}

const validateAccessKeysFromNode = (accessKeys, node) => {
    let nodeAKs = getAccessKeysFromNode(node);
    let validatedNodeAKs = '';
    if (accessKeys.includes(',')) {
        const aks = accessKeys.split(',');
        aks.forEach(ak => {
            if (nodeAKs.includes(ak)) {
                validatedNodeAKs += ak + ',';
            }
        });
    } else {
        if (nodeAKs.includes(accessKeys)) {
            validatedNodeAKs = accessKeys;
        }
    }

    return validatedNodeAKs.split(',').filter(Boolean).join(',');
}

const getClassName = (propertyName) => {
    return propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
}

const initiativeExists = (initiative) => {
    return initiativeData.filter(x => x.initiative == initiative).length == 0;
}

const constructors = {
    User: User,
    General_info: General_info,
    Comercial_info: Comercial_info,
    Fiscal_info: Fiscal_info,
    Address: Address
};

module.exports = {
    constructors,
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
    deleteInitiative
}