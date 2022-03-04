const { Router } = require("express");

const { 
    GetUserController,
    GetUsersController,
    CreateUserController,
    DeleteUserController,
    UpdateUserController
} = require("../controllers/userController");

const userRoutes = new Router();

userRoutes.get("/", GetUserController);

userRoutes.get("/", GetUsersController);

userRoutes.post("/", CreateUserController);

userRoutes.put("/", UpdateUserController);

userRoutes.delete("/", DeleteUserController);

module.exports = userRoutes;