const { getUser, getUsers, createUser, deleteUser, updateUser } = require("../services/userService");

const GetUserController = async(req, res) =>{
    const data = await getUser(req.body);
    res.json(data);
}

const GetUsersController = async(req, res) =>{
    const data = await getUsers();
    res.json(data);
}

const CreateUserController = async(req, res) =>{
    const data = await createUser(req.body);
    res.json(data);
}

const DeleteUserController = async(req, res) =>{
    const data = await deleteUser(req.body);
    res.json(data);
}

const UpdateUserController = async(req, res) =>{
    const data = await updateUser(req.body);
    res.json(data);
}

module.exports = {
    GetUserController,
    GetUsersController,
    CreateUserController,
    DeleteUserController,
    UpdateUserController
};