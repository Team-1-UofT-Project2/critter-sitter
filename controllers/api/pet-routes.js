const router = require('express').Router();
const { Pets, User, Instructions} = require('../../models')

router.get('/', (req, res) => {
    Pets.findAll({})
    .then(petData => res.json(petData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/query', (req, res) => {
    console.log(req.query);
    Pets.findAll({
        where: {
            // care_level: req.query.care_level
        }
    })
    .then(petData => {
        if(!petData) {
            res.status(404).json({ message: 'no pet with this id!'})
            return;
        }
        res.json(petData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    Pets.findOne({
        where: {
            pet_id: req.params.id
        },
        include: [Instructions]
    })
    .then(petData => {
        if (!petData) {
            res.status(404).json({ message: 'no pet found with this id!'})
        }
        res.json(petData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;