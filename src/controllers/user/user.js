const User = require('../../models/User/User');
const dataBase = require('../../../config/db');
dataBase.sync();

const userDB = new User;

async function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto} = req.body;
    const emailExists = await userDB.existingEmail(user_email);

    if(!emailExists.length) {
        
        const password = await userDB.encodePassword(user_password);
        const user =  await userDB.createNewUser(user_nome, user_sobrenome, user_email, password, user_tipo, user_ativo, user_foto);
        if(user.success) {
            res.status(201).json(user);
        } else {
            res.status(500).json(user);
        }
    } else if(emailExists.length){
        return res.status(409).json({alert: `Este e-mail já está em uso.`});
    } else {
        return res.status(500).json({erro: emailExists.erro, msg: `Erro interno ao criar um novo usuário.`})
    }
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