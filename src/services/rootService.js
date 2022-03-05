const { getUserDB, getUsersDB } = require("../services/userService");
const {
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
} = require("../services/initiativeService");

module.exports = root = {
    getUsers: () => {
        return getUsersDB();
    },

    getUser: (data) => {
        return getUserDB(data);
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
}