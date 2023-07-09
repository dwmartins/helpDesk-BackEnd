const { Sequelize, DataTypes} = require('sequelize');
const dataBase = require('../../../config/db');

const User = dataBase.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_sobrenome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_tipo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_ativo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_date_create: {
        type: DataTypes.DATE,
        allowNull: true
    },
    user_date_desable: {
        type: DataTypes.DATE,
        allowNull: true
    },
    user_foto: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = User;
