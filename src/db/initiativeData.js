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

const deleteInitiativeDB = async (data) => {
    let index = initiativeData.findIndex(x => x.initiative === data.initiative);
    console.log(index);
    if (index > -1) {
        initiativeData.splice(index, 1);
    }

    return initiativeData;
}

module.exports = {
    initiativeData,
    getInitiativeDB,
    getInitiativesDB,
    saveInitiativeDB,
    updateInitiativeDB,
    deleteInitiativeDB,
}