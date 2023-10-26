// Import necessary modules from Sequelize library
const { Model, DataTypes } = require("sequelize");

// Import the database connection configuration
const { sequelize } = require("../config/connection");

// Define the 'Instructions' model as a subclass of Sequelize's 'Model'
class Instructions extends Model {}

// Initialize the 'Instructions' model with its attributes and options
Instructions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    instruction_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    pet_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "instructions",
  }
);

// Export the 'Instructions' model for use in the application
module.exports = Instructions;
