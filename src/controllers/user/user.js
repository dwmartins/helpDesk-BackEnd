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
    if(!users.erro) {
        sendResponse(res, 200, users);
    } else {
        sendResponse(res, 500, users)
    };
};

async function updateUser(req, res) {
    const {user_id, user_nome, user_sobrenome, user_foto} = req.body;
    const user = await userDB.updateUserDB(user_id, user_nome, user_sobrenome, user_foto);
    if(!user.erro) {
        const msg = {msg: `Usuário atualizado com sucesso.`};
        sendResponse(res, 201, msg);
    } else {
        sendResponse(res, 500, user);
    }
}

async function disableUser(req, res) {
    const {user_id} = req.params;
    const user = await userDB.disableUserDB(user_id);

    if(!user.erro) {
        const msg = {msg: `Usuário desabilitado com sucesso.`};
        sendResponse(res, 200, msg);
    } else {
        sendResponse(res, 500, user);
    }
}

async function deleteUser(req, res) {
    const { user_id } = req.params;
    const user = await userDB.deleteUserDB(user_id);
    if(!user.erro) {
        const msg = {msg: `Usuário excluído com sucesso.`};
        sendResponse(res, 200, msg);
    } else {
        sendResponse(res, 500, user);
    }
}

async function userLogin(req, res) {
    const { user_email, user_password } = req.body;
    const user = await userDB.userLoginDB(user_email, user_password);
}

function sendResponse(res, statusCode, msg) {
    res.status(statusCode).json(msg);
}

module.exports = {  newUser, 
                    allUsers,
                    updateUser,
                    disableUser,
                    deleteUser,
                    userLogin
                };