const router = require("express").Router();
const { Pets, User, Instructions } = require("../../models");
const withAuth = require("../../utils/authorize");

// Route to get a single pet with the url id
router.get("/:id", withAuth, async (req, res) => {
  try {
    const petsWithInstructions = await Pets.findByPk(req.params.id, {
      include: [
        {
          model: Instructions,
          include: User,
          raw: true,
          nest: true,
        },
      ],
    });

    const pets = petsWithInstructions.get({ plain: true });

    if (!pets) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const pet = petsWithInstructions.toJSON();
    const loggedIn = req.session.user_id ? true : false;
    console.log("Requested Pet ID:", req.params.id);
    console.log(pets);
    res.render("single-pet", {
      loggedIn: loggedIn,
      loggedInUser: req.session.user_id,
      pet: pet, // Pass the pet to your view
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/new-pet', withAuth, async (req, res) => {
  try {
    const newPet = await Pets.create({
      pet_name: req.body.pet_name,
      owner: req.body.owner,
      address: req.body.address,
      care_level: req.body.care_level,
      description: req.body.description,
      user_id: req.session.user_id, // adding the user_id to associate the pet with the logged-in user
    });

    res.status(200).json(newPet);
  } catch (err) {
    res.status(400).json(err);
  }
});

/* router.get("/:id", withAuth, async (req, res) => {
  try {
    const petsWithInstructions = await Pets.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Instructions,
          include: User,
        },
      ],
    });

    const pets = petsWithInstructions.get({ plain: true });

    if (!pets) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const pet = petsWithInstructions.toJSON();

    const loggedIn = req.session.user_id ? true : false;

    res.render("single-pet", {
      loggedIn: loggedIn,
      loggedInUser: req.session.user_id,
      pet: pet,
    });
    console.log(pets);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

/* router.get("/", withAuth, async (req, res) => {
  try {
    const petData = await Pets.findAll({
      include: [User],
    });

    res.status(200).json(petData);
    console.log(petData);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

/*
router.get("/query", (req, res) => {
  console.log(req.query);
  Pets.findAll({
    where: {
      // care_level: req.query.care_level
    },
  })
    .then((petData) => {
      if (!petData) {
        res.status(404).json({ message: "no pet with this id!" });
        return;
      }
      res.json(petData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});*/

module.exports = router;
