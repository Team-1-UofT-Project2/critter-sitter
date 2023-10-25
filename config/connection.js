const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    'pet_db',
    'root',
    '!1Qq2w3e',
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        logging: false,
      },
      console.log(`Connected to the pet_db database.`)
    );

module.exports = { sequelize };
