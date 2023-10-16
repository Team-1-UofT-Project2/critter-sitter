const { User } = require('../models');

const userData = [
    {
        username: 'username1',
        email: 'username1@email.com',
        password: '1q2w3e'
    },
    {
        username: 'username2',
        email: 'username2@email.com',
        password: '4r5t6y'
    },
    {
        username: 'username3',
        email: 'username3@email.com',
        password: '1q3e5t'
    },
    {
        username: 'username4',
        email: 'username4@email.com',
        password: '3e6y9o'
    }
]

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;