const { getUserDB, getUsersDB, saveUserDB, deleteUserDB, updateUserDB } = require("../db/userData")

const getUser = async (data) => {
    return await getUserDB(data);
}

const getUsers = async () => {
    return await getUsersDB();
}

const createUser = async (data) => {
    data.added = Date.now();
    await saveUserDB(data);
    return data;
}

const updateUser = async (data) => {
    await updateUserDB(data);
    return data;
}

const deleteUser = async (data) => {
    await deleteUserDB(data);
    return data;
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}