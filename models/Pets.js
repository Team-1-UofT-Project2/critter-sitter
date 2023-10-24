const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");
// const User = require("./User");

class Pets extends Model {}

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "user", // This should match the model name of your User model
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

/*Pets.belongsTo(User, {
  foreignKey: 'user_id',
});
*/
module.exports = Pets;
