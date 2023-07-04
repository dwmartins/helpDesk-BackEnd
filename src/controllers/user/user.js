const User = require('../../models/User/User');
const dataBase = require('../../../config/db');
dataBase.sync();

const userDB = new User;

async function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto} = req.body;
    const emailExists = await userDB.existingEmail(user_email);

    if(!emailExists.length) {
        const user =  await userDB.createNewUser(user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto);
        if(!user.error) {
            res.status(201).json(user);
        } else {
            res.status(500).json(user)
        }
    } else {
        return res.status(409).json({alert: `Este e-mail já está em uso.`});
    };
};

async function allUsers(req, res) {
    const users = await userDB.allUsersDB();
    if(!users.error) {
        res.status(200).json(users);
    } else {
        res.status(500).json(users);
    };
};

module.exports = {newUser, allUsers}