const { getUserDB, getUsersDB, saveUserDB, deleteUserDB, updateUserDB } = require("../db/userData");
const { getInitiativeDB, getInitiativesDB, saveInitiativeDB, updateInitiativeDB, deleteInitiativeDB } = require("../db/initiativeData");

module.exports = root = {
    getUsers: () => {
        return getUsersDB();
    },
    
    getUser: (data) => {
        return getUserDB(data);
    },
    createUser: (data) => {
        return saveUserDB(data);
    },
    updateUser: (data) => {
        return updateUserDB(data);
    },
    deleteUser: (data) => {
        return deleteUserDB(data);
    },
    
    getInitiatives: () => {
        return getInitiativesDB();
    },
    
    getInitiative: (data) => {
        return getInitiativeDB(data);
    },
    createInitiative: (data) => {
        return saveInitiativeDB(data);
    },
    updateInitiative: (data) => {
        return updateInitiativeDB(data);
    },
    deleteInitiative: (data) => {
        return deleteInitiativeDB(data);
    },
}