require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize("pet_db", "root", "!1Qq2w3e", {
        host: 'localhost',
        dialect: 'mysql',
    });

    module.exports = sequelize;