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
    user_tipo_nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_tipo_nivel: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}) ;

User_type.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' // Isso define o comportamento de exclusão em cascata, se um usuário for excluído, seus tipos também serão.
});

module.exports = User_type;