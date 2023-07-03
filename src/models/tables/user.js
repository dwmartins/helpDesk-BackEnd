const Sequelize = require('sequelize');
const dataBase = require('../../../config/db');

const User = dataBase.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_ativo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user_data_create: {
        type: Sequelize.DATE,
        allowNull: true
    },
    user_data_desable: {
        type: Sequelize.DATE,
        allowNull: true
    },
    user_foto: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = User;
