const {
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
    deleteInitiative
} = require("../services/initiativeService");

module.exports = root = {
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