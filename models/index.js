// Import the data models for Instructions, User, and Pets
const Instructions = require("./Instructions");
const User = require("./User");
const Pets = require("./Pets");

// Define associations between the data models
User.hasMany(Instructions, {
  foreignKey: "user_id",
});

User.hasMany(Pets, {
  foreignKey: "user_id",
});

Pets.belongsTo(User, {
  foreignKey: "user_id",
});

Instructions.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Pets.hasMany(Instructions, {
  foreignKey: "pets_id",
  onDelete: "CASCADE",
});

// Export the associated models for use in the application
module.exports = { User, Instructions, Pets };
