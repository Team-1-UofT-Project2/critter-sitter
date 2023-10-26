const { User, Pets, Instructions } = require("../models");
const { sequelize } = require("../config/connection");

// Update imports to use .js files
const userData = require("./user-seed.json");
const petData = require("./pet-seed.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const pet of petData) {
      const user = users.find(
        (user) => user.dataValues.user_id === pet.user_id
      );
      if (user) {
        await Pets.create({
          ...pet,
          user_id: user.dataValues.user_id,
        });
      } else {
        console.error(`User not found for pet with user_id: ${pet.user_id}`);
      }
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
