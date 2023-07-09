const User = require('../models/User/User');
const jwt = require('jsonwebtoken');

const userDB = new User;

async function authenticateToken(req, res, next) {
    const { user_id, user_token} = req.headers;

    if(!user_token) {
        const msg = { mensagem: 'Token não fornecido' };
        return sendResponse(res, 401, msg)
    }

    try {
        const fetchUserToken = await userDB.fetchUserToken(user_id);
        jwt.verify(user_token, fetchUserToken.user_token);
        console.log('autenticado')
        next();
    } catch (error) {
        const msg = {invalidToken: `Token invalido`};
        sendResponse(res, 403, msg);
    }
}

function sendResponse(res, statusCode, msg) {
    res.status(statusCode).json(msg);
}

module.exports = {authenticateToken};