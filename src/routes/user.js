const express = require('express');
const controllers = require('../controllers/user/user');
const user_token = require('../middleware/verify_token');
const user_type = require('../middleware/user_type');
const user = express.Router();

user.post('/novo-usuario', controllers.newUser);
user.post('/login', controllers.userLogin);
user.post('/solicita-nova-senha', controllers.newPassword);
user.post('/compare-codigo-senha', controllers.compareCodigoPassword);
user.post('/nova-senha', controllers.updatePassword);
user.post('/atualiza-tipo-usuario', user_type.checkUserType, controllers.updateUserType);

user.get('/todos-usuarios', user_token.authenticateToken,  controllers.allUsers);
user.put('/atualiza-usuario', user_token.authenticateToken, controllers.updateUser);
user.put('/desabilita-usuario/', user_token.authenticateToken, controllers.disableUser);
user.delete('/deletar-usuario/:user_id', user_token.authenticateToken, controllers.deleteUser);


module.exports = user;