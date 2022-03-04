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
        updateUserDB(data);
        return data;
    },
    deleteUser: (data) => {
        deleteUserDB(data);
        return data;
    },
    
    getInitiatives: () => {
        return getInitiativesDB();
    },
    
    getInitiative: (data) => {
        return getInitiativeDB(data);
    },
    createInitiative: (data) => {
        saveInitiativeDB(data);
        return data;
    },
    updateInitiative: (data) => {
        updateInitiativeDB(data);
        return data;
    },
    deleteInitiative: (data) => {
        deleteInitiativeDB(data);
        return data;
    },
}