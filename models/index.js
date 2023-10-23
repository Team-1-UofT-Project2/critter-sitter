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

Instructions.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Pets.hasMany(Instructions, {
  foreignKey: "pets_id",
  onDelete: "CASCADE",
});

// Old asssociations that was not working
/* User.hasMany(Pets, {
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
}); */

// Don't know what is this. It was here already.
/*Pets.hasMany(Instructions, {
  foreignKey: "pets_id",
  onDelete: "CASCADE",
});*/

module.exports = { User, Instructions, Pets };
