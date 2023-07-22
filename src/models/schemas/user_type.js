const { Sequelize, DataTypes} = require('sequelize');
const dataBase = require('../../../config/db');

const User_type = dataBase.define('user_tipo', {
    user_tipo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'users',
        key: 'user_id',
        },
    },
    user_tipo_nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_tipo_nivel: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}) ;

module.exports = User_type;