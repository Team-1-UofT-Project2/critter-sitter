// Import the Sequelize library for working with databases
const Sequelize = require("sequelize");

// Import the dotenv library to load environment variables from a .env file
require("dotenv").config();

// Check if a JAWSDB_URL environment variable is set
// If it's set, create a Sequelize instance using the JAWSDB_URL
// If not, create a Sequelize instance with the local database connection details
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        logging: false,
      },
      console.log(`Connected to the pet_db database.`)
    );

// Export the 'sequelize' object for use in other parts of the application
module.exports = { sequelize };
