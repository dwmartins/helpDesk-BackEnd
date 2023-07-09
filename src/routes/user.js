const express = require('express');
const controllers = require('../controllers/user/user');
const user_token = require('../middleware/verify_token');
const user = express.Router();

user.post('/novo-usuario', controllers.newUser);
user.get('/todos-usuarios', user_token.authenticateToken,  controllers.allUsers);
user.put('/atualiza-usuario', user_token.authenticateToken, controllers.updateUser);
user.put('/desabilita-usuario/:user_id', user_token.authenticateToken, controllers.disableUser);
user.delete('/deletar-usuario/:user_id', user_token.authenticateToken, controllers.deleteUser);

user.post('/login', controllers.userLogin);

module.exports = user;