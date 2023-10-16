const seedPets = require('./pet-seed');
const seedUser = require('./user-seed');

const sequelize = require('../config/connection')

async function seedAll(){
    await sequelize.sync({ force: true});
    console.log('database is synced');

    await seedPets();
    console.log('pets are seeded')

    await seedUser();
    console.log('users are seeded');

    process.exit(0);
};

seedAll();