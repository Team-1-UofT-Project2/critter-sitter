const router = require('express').Router();
const { User, Instructions, Pets } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User,findOne({
        attributes: {exclude: ['password'] },
        where: {
            user_id: req.params.id
        },
        include: [
            {
                model: Instructions,
                attributes: ['id', 'instruction_text', 'created_at']
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});

router.post('/', async(req, res) => {
    try {
        let existingUser = await User.findOne({
            attributes: {exclude: ['password']},
            where: {
                email: req.body.email
            }
        });

        if (!existingUser) {
            let newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;
            });
            res.json(newUser);
            return;
        }
        res.status(400).json({ message: 'A user with this email already exists'})
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.post('/logout', (req, user) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id'})
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.put('/:id', Auth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json(err);
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', async (req, res) => {
    try{
        let findUser = await User.find({
            where: {
                email: req.body.email
            }
        });
        if (!findUser) {
            res.status(400).json({message: 'no user with that email'});
            return;
        }

        const valCredentials = findUser.login(req.body.password);
        if(!valCredentials) {
            res.status(400).json({ message: 'incorrect password'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = findUser.id;
            req.session.loggedIn = true;
            res.json({ user: findUser, message: 'you are now logged in'})
        })


    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;