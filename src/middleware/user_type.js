const User = require('../models/User/User');

const userDB = new User;

async function checkUserType(req, res, next) {
    const { user_tipo } = req.body;
    console.log(user_tipo)

    if(user_tipo === 'admin') {
        next();
    } else {
        const response = {alert: `Você não tem permissão para alterar o tipo do usuário.`};
        res.status(400).json(response);
    }
}

module.exports = { checkUserType }