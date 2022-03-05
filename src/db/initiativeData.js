const initiativeData = [];

const getInitiativeDB = async (data) => {
    return initiativeData.filter(x => x.initiative == data.initiative)[0];
}

const getInitiativesDB = async () => {
    return initiativeData;
}

const saveInitiativeDB = async (data) => {
    initiativeData.push(data);
    return (data);
}

const updateInitiativeDB = async (data, data2) => {
    initiativeData.filter(x => x.initiative == data2.initiative)[0].fields = data2.fields;
    return initiativeData.filter(x => x.initiative == data2.initiative)[0];
}

module.exports = {
    initiativeData,
    getInitiativeDB,
    getInitiativesDB,
    saveInitiativeDB,
    updateInitiativeDB,
}