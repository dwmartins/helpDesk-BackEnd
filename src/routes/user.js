const express = require('express');
const controllers = require('../controllers/user/user');
const user = express.Router();

user.post('/novo-usuario', controllers.newUser);

module.exports = user;