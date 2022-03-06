const {
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
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
}