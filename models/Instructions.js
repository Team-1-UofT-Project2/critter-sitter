const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

class Instructions extends Model {}

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
      // references: {},
    },
    pet_id: {
      type: DataTypes.INTEGER,
      // references: {},
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "instructions",
  }
);

module.exports = Instructions;
