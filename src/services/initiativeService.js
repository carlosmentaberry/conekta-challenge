const { getInitiativeDB, getInitiativesDB, saveInitiativeDB, updateInitiativeDB, deleteInitiativeDB } = require("../db/initiativeData")

const getInitiative = async () => {
    return await getInitiativeDB();
}

const getInitiatives = async () => {
    return await getInitiativesDB();
}

const createInitiative = async (data) => {
    return await saveInitiativeDB(data);
}

const updateInitiative = async (data) => {
    await updateInitiativeDB(data);
    return data;
}

const deleteInitiative = async (data) => {
    await deleteInitiativeDB(data);
    return data;
}

module.exports = {
    getInitiative,
    getInitiatives,
    createInitiative,
    updateInitiative,
    deleteInitiative
}