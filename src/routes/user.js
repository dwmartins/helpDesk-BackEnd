const express = require('express');
const controllers = require('../controllers/user/user');
const user = express.Router();

user.post('/novo-usuario', controllers.newUser);
user.get('/todos-usuarios', controllers.allUsers);
user.put('/atualiza-usuario', controllers.updateUser);
user.put('/desabilita-usuario/:user_id', controllers.disableUser);
user.delete('/deletar-usuario/:user_id', controllers.deleteUser);

user.post('/login', controllers.userLogin);

module.exports = user;