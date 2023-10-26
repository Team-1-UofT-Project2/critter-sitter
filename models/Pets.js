// Import necessary modules from the Sequelize library
const { Model, DataTypes } = require("sequelize");

// Import the database connection configuration
const { sequelize } = require("../config/connection");

// Define the 'Pets' model as a subclass of Sequelize's 'Model'
class Pets extends Model {}

// Initialize the 'Pets' model with its attributes and options
Pets.init(
  {
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    care_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "pets",
  }
);

// Export the 'Pets' model for use in the application
module.exports = Pets;
