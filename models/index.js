const Instructions = require("./Instructions");
const User = require("./User");
const Pets = require("./Pets");

/* User.hasMany(Instructions, {
  foreignKey: "user_id",
});

User.hasMany(Pets, {
  foreignKey: "user_id",
});

Instructions.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Pets.hasMany(Instructions, {
  foreignKey: "pets_id",
  onDelete: "CASCADE",
}); */

User.hasMany(Pets, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Pets.belongsTo(User, {
  foreignKey: "user_id",
});

Pets.hasMany(Instructions, {
  foreignKey: "pet_id",
  onDelete: "CASCADE",
});

Instructions.belongsTo(Pets, {
  foreignKey: "pet_id",
});

/*Pets.hasMany(Instructions, {
  foreignKey: "pets_id",
  onDelete: "CASCADE",
});*/

module.exports = { User, Instructions, Pets };
