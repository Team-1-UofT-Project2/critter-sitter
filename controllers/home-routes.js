const router = require('express').Router();

const { Pets, User, Instructions} = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn})
})


router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return 
    }
    res.redirect('/login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

router.get('/results', async (req, res) => {
    Pets.findAll({
        where: {
            care_level: req.query.care_level        
        }
    })
    .then(petData => {
        if (!petData) {
            res.status(404).json({ message: 'no pets with this criteria'})
            return;
        }
        const results = petData.map(pet => pet.get({ plain: true}));
        res.render('results', { loggedIn: req.session.loggedIn, results})
    })
})

module.exports = router;