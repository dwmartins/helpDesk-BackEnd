const User = require('../schemas/user');
const { Sequelize, DataTypes} = require('sequelize');
const dataBase = require('../../../config/db');

const User_type = dataBase.define('user_tipo', {
    tipo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_tipo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}) ;

User_type.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = User_type;