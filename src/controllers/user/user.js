const User = require('../../models/User/User');
const dataBase = require('../../../config/db');

const userDB = new User;

async function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto} = req.body;
    const emailExists = await userDB.existingEmail(user_email);

    if(!emailExists.length) {
        
        const password = await userDB.encodePassword(user_password);
        const user =  await userDB.createNewUser(user_nome, user_sobrenome, user_email, password, user_tipo, user_ativo, user_foto);
        if(user.success) {
            sendResponse(res, 201, user);
        } else {
            sendResponse(res, 500, user)
        }
    } else if(emailExists.length){
        const msg = {alert: `Este e-mail já está em uso.`};
        sendResponse(res, 409, msg);
    } else {
        const msg = {erro: emailExists.erro, msg: `Erro ao criar o usuário.`};
        sendResponse(res, 500, msg);
    }
};

async function allUsers(req, res) {
    const users = await userDB.allUsersDB();
    if(!users.error) {
        sendResponse(res, 200, users);
    } else {
        sendResponse(res, 500, users)
    };
};

function sendResponse(res, statusCode, msg) {
    res.status(statusCode).json(msg);
}

module.exports = {newUser, allUsers}