const User = require('../../models/User/User');
const dataBase = require('../../../config/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../nodemailer/email');

const userDB = new User;

async function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto} = req.body;
    const emailExists = await userDB.existingEmail(user_email);
    const token = newCrypto();

    if(!emailExists.length) {
        const password = await userDB.encodePassword(user_password);
        const user =  await userDB.createNewUser(user_nome, user_sobrenome, user_email, password, user_tipo, token, user_ativo, user_foto);
        if(user.success) {
            await userDB.addTypeUserDB(user_tipo, user.userData.user_id);
            sendEmail.welcome(user_email, user_nome);
            sendResponse(res, 201, user);
        } else {
            sendResponse(res, 500, user)
        }
    } else if(emailExists.length){
        const response = {alert: `Este e-mail já está em uso.`};
        sendResponse(res, 409, response);
    } else {
        const response = {erro: emailExists.erro, msg: `Erro ao criar o usuário.`};
        sendResponse(res, 500, response);
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
    console.log(req.body)
    const {user_id, user_nome, user_sobrenome, user_tipo, user_foto} = req.body;
    
    const [user, data] = await Promise.all([
        userDB.updateUserDB(user_id, user_nome, user_sobrenome, user_foto),
        userDB.updateUserTypeDB(user_id, user_tipo)
    ]);

    if(!user.erro && !data.erro) {
        const response = {success: true, msg: `Usuário atualizado com sucesso.`};
        sendResponse(res, 201, response);
    } else {
        sendResponse(res, 500, user);
    }
}

async function updateUserType(req, res) {
    const {user_id, user_new_tipo} = req.body;
    const data = await userDB.updateUserTypeDB(user_id, user_new_tipo);
    if(data) {
        const response = {success: true, msg: `Tipo de usuário alterado para ${user_new_tipo}`};
        sendResponse(res, 200, response);
    } else {
        sendResponse(res, 500, data);
    }
}

async function disableUser(req, res) {
    const {user_id, user_acao} = req.query;
    const user = await userDB.disableUserDB(user_id, user_acao);

    if(!user.erro) {
        let action = '';
        user_acao == 'S' ? action = 'habilitado' : action = 'desabilitado';
        const response = {success: true, msg: `Usuário ${action} com sucesso.`};
        sendResponse(res, 200, response);
    } else {
        sendResponse(res, 500, user);
    }
}

async function deleteUser(req, res) {
    const { user_id } = req.params;
    const user = await userDB.deleteUserDB(user_id);
    if(!user.erro) {
        const response = {success: true, msg: `Usuário excluído com sucesso.`};
        sendResponse(res, 200, response);
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
        const data = {success: true, user_token: token, user: user.userData};
        const user_ip = req.ip.replace('::ffff:', '');

        await userDB.userAccess(user.userData.user_id, user_email, user_ip);
        sendResponse(res, 200, data);
    } else if(user.alert) {
        sendResponse(res, 400, user);
    } else if(user.erro){
        sendResponse(res, 500, user);
    }
}

async function newPassword(req, res) {
    const { user_email } = req.body;
    const user = await userDB.searchUserByEmail(user_email);
    
    if(user) {
        const code = generateAlphanumericCode(6);

        const saveCode = await userDB.newPasswordDB(user.user_id, code);
    
        if(saveCode) {
            sendEmail.newPassword(user.user_email, user.user_nome, code);
            const response = {success: true, user_id: user.user_id, msg: `Código de confirmação enviado no e-mail: ${user_email}`};
            sendResponse(res, 200, response);
        } else {
            const response = {erro: saveCode.erro, msg: `Erro ao enviar o código de confirmação, tente novamente.`};
            sendResponse(res, 500, response);
        }
    } else {
        const response = {alert: `Usuário não encontrado`}
        sendResponse(res, 400, response);
    }
}

async function compareCodigoPassword(req, res) {
    const { user_id, codigo } = req.body;
    const data = await userDB.compareCodigoPasswordDB(user_id, codigo);

    if(data) {
        if(data.codigo_usado) {
            const response = {alert: `Código de verificação já utilizado`};
            sendResponse(res, 400, response);
        } else {
            const response = {success: true, codigo_id: data.codigo_id, codigo: data.codigo, user_id: data.user_id, msg: `Código validado.`};
            sendResponse(res, 200, response)
        }
       
    } else {
        const response = {alert: `Código de verificação incorreto`};
        sendResponse(res, 400, response) 
    }
}

async function updatePassword(req, res) {
    const { user_id, new_password, codigo_id } = req.body;
    const password_hash = await userDB.encodePassword(new_password);
    if(password_hash) {
        const newPassword = await userDB.updatePasswordDB(user_id, password_hash);
        if(newPassword) {
            const response = {success: true, msg: `Senha alterada com sucesso.`};
            await userDB.updateCodigoPasswordDB(codigo_id);
            sendResponse(res, 200, response);
        } else {
            const response = {erro: newPassword.erro, msg: `Erro ao alterar a senha, tente novamente.`};
            sendResponse(res, 500, response);
        }
    } else {
        const response = {erro: password_hash.erro, msg: `Erro ao alterar a senha, tente novamente.`};
        sendResponse(res, 500, response);
    }
}

function sendResponse(res, statusCode, msg) {
    res.status(statusCode).json(msg);
}

function newCrypto() {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}

function generateAlphanumericCode(tamanho) {
    let code = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < tamanho; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      code += caracteres.charAt(indice);
    }
  
    return code;
}

module.exports = {
    newUser, 
    allUsers,
    updateUser,
    disableUser,
    deleteUser,
    userLogin,
    newPassword,
    compareCodigoPassword,
    updatePassword,
    updateUserType
};