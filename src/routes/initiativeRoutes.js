const { Router } = require("express");

const { 
    GetInitiativeController, 
    GetInitiativesController, 
    CreateInitiativeController, 
    UpdateInitiativeController, 
    DeleteInitiativeController 
} = require("../controllers/initiativeController");

const initiativeRoutes = new Router();

initiativeRoutes.get("/", GetInitiativeController);

initiativeRoutes.get("/", GetInitiativesController);

initiativeRoutes.post("/", CreateInitiativeController);

initiativeRoutes.put("/", UpdateInitiativeController);

initiativeRoutes.delete("/", DeleteInitiativeController);

module.exports = initiativeRoutes;