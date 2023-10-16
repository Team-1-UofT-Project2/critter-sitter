const { Pets } = require('../models');

const petData = [
    {
        pet_name: 'Rover',
        care_level: 'low',
        description:'yellow labrador dog'//,
       // image:
    },
    {
        pet_name: 'mr.mittens',
        care_level: 'high',
        description: 'black and grey tabbie cat that is 9 years old with type 2 diabetes'//,
       // image:
    },
    {
        pet_name: 'Ceasar',
        care_level: 'mid',
        description: ' a black and yellow speckled koi fish'//,
        //image:
    },
    {
        pet_name: 'tito',
        care_level: 'high',
        description: 'a tanned chihuahwa with its front paw missing and a bad case of scoliosis'//,
        //image:
    },
    {
        pet_name: 'munster',
        care_level: 'low',
        description: 'a gray-furred Persian cat',
        //image:
    },
    {
        pet_name: 'senor slithers',
        care_level: 'mid',
        description: 'a green ball python with a yellow under-belly'//,
        //image:
    }
];

const seedPets = () => Pets.bulkCreate(petData)

module.exports = seedPets;

