const { Sequelize, DataTypes} = require('sequelize');
const dataBase = require('../../../config/db');

const New_password = dataBase.define('codigo_senha', {
    codigo_id: {
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
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo_usado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    data_solicitada: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = New_password;
