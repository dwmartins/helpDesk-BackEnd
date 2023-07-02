const { Sequelize } = require('sequelize');
require('dotenv').config();

const dataBase = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const db_type = process.env.DB_TYPE;

const sequelize = new Sequelize(dataBase, user, password, {
    host: host,
    dialect: db_type
});

async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log(`successfully connected to the database!`)
    } catch (error) {
        console.error(`error connecting to database, ${error}`)
    }
}

checkConnection();
sequelize.sync();

module.exports = sequelize;

