const { getUserDB, getUsersDB, saveUserDB, deleteUserDB, updateUserDB } = require("../services/userService");
const {
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
    deleteInitiative
} = require("../services/initiativeService");

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
        return getInitiatives();
    },

    getInitiative: (data) => {
        return getInitiative(data);
    },
    createInitiative: (data) => {
        return createInitiative(data);
    },
    updateInitiative: (data) => {
        return updateInitiative(data);
    },
    deleteInitiative: (data) => {
        return deleteInitiative(data);
    },
}