const { getInitiative, getInitiatives, createInitiative, deleteInitiative, updateInitiative } = require("../services/initiativeService");

const GetInitiativeController = async(req, res) =>{
    const data = await getInitiative(req.body);
    res.json(data);
}

const GetInitiativesController = async(req, res) =>{
    const data = await getInitiatives();
    res.json(data);
}

const CreateInitiativeController = async(req, res) =>{
    const data = await createInitiative(req.body);
    res.json(data);
}

const DeleteInitiativeController = async(req, res) =>{
    const data = await deleteInitiative(req.body);
    res.json(data);
}

const UpdateInitiativeController = async(req, res) =>{
    const data = await updateInitiative(req.body);
    res.json(data);
}

module.exports = {
    GetInitiativeController,
    GetInitiativesController,
    CreateInitiativeController,
    DeleteInitiativeController,
    UpdateInitiativeController
};