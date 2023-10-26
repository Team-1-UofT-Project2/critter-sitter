// Import necessary modules from the Sequelize library and other dependencies
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");
const bcrypt = require("bcrypt");

// Define the 'User' model as a subclass of Sequelize's 'Model'
class User extends Model {
  // Custom method to check the provided password against the stored hash
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the 'User' model with its attributes and options
User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    // Define hooks for actions before creating and updating user data
    hooks: {
      // Before creating a new user, hash the provided password using bcrypt
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before updating user data, hash the new password if it's being updated
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// Export the 'User' model for use in the application
module.exports = User;
