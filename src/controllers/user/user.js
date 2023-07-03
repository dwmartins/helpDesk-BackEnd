const User = require('../../models/User/User');
const dataBase = require('../../../config/db');
dataBase.sync();

const newUserDB = new User;

async function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_date_create, user_foto} = req.body;
    const user =  await newUserDB.createNewUser(user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto)
    console.log(user);
    if(user.success == true) {
        res.status(201).json({success: `O usuário(a) ${user_nome} foi criado com sucesso.`});
    } else if(user.success == false) {
        res.status(500).json({error: `Erro ao criar o usuário.`})
    }
}

module.exports = {newUser}