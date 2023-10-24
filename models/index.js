const Instructions = require("./Instructions");
const User = require("./User");
const Pets = require("./Pets");

//Working associations
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

module.exports = { User, Instructions, Pets };
