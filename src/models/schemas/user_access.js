const { Sequelize, DataTypes} = require('sequelize');
const dataBase = require('../../../config/db');

const Acesso = dataBase.define('user_acesso', {
    acesso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'users',
        key: 'user_id',
        },
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    acesso_data: {
        type: DataTypes.DATE,
    },
});

module.exports = Acesso;
