const User = require('../schemas/user');
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

New_password.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = New_password;
