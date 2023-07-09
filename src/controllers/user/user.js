const User = require('../../models/User/User');
const dataBase = require('../../../config/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userDB = new User;

async function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto} = req.body;
    const emailExists = await userDB.existingEmail(user_email);
    const token = newCrypto();

    if(!emailExists.length) {
        const password = await userDB.encodePassword(user_password);
        const user =  await userDB.createNewUser(user_nome, user_sobrenome, user_email, password, user_tipo, token, user_ativo, user_foto);
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
    const {user_id, user_acao} = req.query;
    const user = await userDB.disableUserDB(user_id, user_acao);

    if(!user.erro) {
        let action = '';
        user_acao == 'S' ? action = 'habilitado' : action = 'desabilitado';
        const msg = {msg: `Usuário ${action} com sucesso.`};
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
    if(user.success) {   
        const payload  = { email: user.userData.user_email };
        const token = jwt.sign(payload, user.userData.user_token);
        const data = {user_token: token, user: user.userData};
        const user_ip = req.ip.replace('::ffff:', '');

        await userDB.userAccess(user.userData.user_id, user_email, user_ip);
        sendResponse(res, 200, data);
    } else if(user.alert) {
        sendResponse(res, 400, user);
    } else if(user.erro){
        sendResponse(res, 500, user);
    }
}

function sendResponse(res, statusCode, msg) {
    res.status(statusCode).json(msg);
}

function newCrypto() {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}

module.exports = {  newUser, 
                    allUsers,
                    updateUser,
                    disableUser,
                    deleteUser,
                    userLogin
                };