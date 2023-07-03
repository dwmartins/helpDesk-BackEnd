const User = require('../../models/User/User');

const newUserDB = new User;

function newUser(req, res) {
    const {user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_date_create, user_foto} = req.body;
    const user = newUserDB.createNewUser(user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_date_create, user_foto)

    if(user.success) {
        res.status(201).json({success: `O usuário ${user_nome} foi criado com sucesso.`});
    } else {
        res.status(500).json({error: `Erro ao criar o usuário.`})
    }
}

module.exports = {newUser}