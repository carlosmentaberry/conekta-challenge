const initiativeData = [];

const getInitiativeDB = async (data) => {
    let asdf = initiativeData.filter(x => x.initiative === data.initiative)[0]
    return asdf;
}

const getInitiativesDB = async () => {
    return initiativeData;
}

const saveInitiativeDB = async (data) => {
    initiativeData.push(data);
    return (data);
}

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
    initiativeData,
    getInitiativeDB,
    getInitiativesDB,
    saveInitiativeDB,
    updateInitiativeDB,
    deleteInitiativeDB,
}