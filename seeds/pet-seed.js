const { Pets } = require("../models");

const petData = [
  {
    pet_name: "Rover",
    owner: "Wesley",
    address: "Southern Av, 420, Surrey, BC, Canada",
    care_level: "low",
    description: "yellow labrador dog",
    // image:
  },
  {
    pet_name: "mr.mittens",
    owner: "Wesley",
    address: "Southern Av, 420, Surrey, BC, Canada",
    care_level: "high",
    description:
      "black and grey tabbie cat that is 9 years old with type 2 diabetes",
    // image:
  },
  {
    pet_name: "Ceasar",
    owner: "Wesley",
    address: "Southern Av, 420, Surrey, BC, Canada",
    care_level: "mid",
    description: " a black and yellow speckled koi fish",
    //image:
  },
  {
    pet_name: "tito",
    owner: "Wesley",
    address: "Southern Av, 420, Surrey, BC, Canada",
    care_level: "high",
    description:
      "a tanned chihuahwa with its front paw missing and a bad case of scoliosis",
    //image:
  },
  {
    pet_name: "munster",
    owner: "Wesley",
    address: "Southern Av, 420, Surrey, BC, Canada",
    care_level: "low",
    description: "a gray-furred Persian cat",
    //image:
  },
  {
    pet_name: "senor slithers",
    owner: "Wesley",
    address: "Southern Av, 420, Surrey, BC, Canada",
    care_level: "mid",
    description: "a green ball python with a yellow under-belly",
    //image:
  },
];

const seedPets = () => Pets.bulkCreate(petData);

module.exports = seedPets;
