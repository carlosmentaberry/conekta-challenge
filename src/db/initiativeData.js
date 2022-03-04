const { User, General_info, Comercial_info, Fiscal_info, Address } = require("../models/user");
const { Initiative, Field } = require("../models/initiative");



const initiativeData = [];
//     {
//         initiative: "risk",
//         fields:
//             [
//                 {
//                     property: "general_info",
//                     access_key: "name, last_name, email"
//                 },
//                 {
//                     property: "comercial_info",
//                     access_key: "company_name, web"
//                 },
//                 {
//                     property: "fisca_info",
//                     access_key: "rfc, activity"
//                 },
//                 {
//                     property: "fisca_info.address",
//                     access_key: "street, number, zip_code"
//                 }
//             ]
//     }
// ];


const getInitiativeDB = async (data) => {
    let init = initiativeData.filter(x => x.initiative == data.initiative)[0];
    if(init){
        let initiative = new Initiative();
        initiative.initiative = data.initiative;
        initiative.fields = [];
        init.fields.forEach(field => {
            
            let fi = getAccessKeysFromNode(getClassName(field.property));
            let obj = new constructors[getClassName(field.property)]();
            let user = new User();
            
            for (const [key, value] of Object.entries(user)) {
                user[key] = new constructors[getClassName(key)]();
                if(key == field.property){
                    for (const [key, value] of Object.entries(obj)) {
                        if(field.access_key.includes(key)){
                            obj[key] = true;
                        }else{
                            obj[key] = false;
                        }
                    }
                    user[field.property] = obj;
                }else{
                    let obj = new constructors[getClassName(key)]();
                    for (const [key, value] of Object.entries(obj)) {
                        obj[key] = false;
                    }
                    user[key] = obj;
                }
            }
            initiative.fields.push(user)
        });
        return initiative;
    }

}

const getInitiativesDB = async () => {
    return initiativeData;
}

const saveInitiativeDB = async (data) => {
    let init = new Initiative("", []);

    if (data.initiative) {
        if (initiativeExists(data.initiative.initiative)) {
            init.initiative = data.initiative.initiative;
            for (i = 0; i <= data.initiative.fields.length - 1; i++) {
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
            initiativeData.push(init);
        }
    }
    return initiativeData;
}

const initiativeExists = (initiative) => {
    return initiativeData.filter(x => x.initiative == initiative).length == 0;
}

const getAccessKeysFromNode = (classname) => {
    let obj = new constructors[classname]();
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

var constructors = {
    User: User,
    General_info: General_info,
    Comercial_info: Comercial_info,
    Fiscal_info: Fiscal_info,
    Address: Address
};

const updateInitiativeDB = async (data) => {
    initiativeData.filter(x => x.initiative === data.initiative)[0].fields = data.fields;
    return initiativeData;
}

const deleteInitiativeDB = async (data) => {
    let index = initiativeData.findIndex(x => x.initiative === data.initiative);
    console.log(index);
    if (index > -1) {
        initiativeData.splice(index, 1);
    }

    return initiativeData;
}

module.exports = {
    getInitiativeDB,
    getInitiativesDB,
    saveInitiativeDB,
    updateInitiativeDB,
    deleteInitiativeDB,
}