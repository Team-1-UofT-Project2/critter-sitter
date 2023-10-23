const router = require("express").Router();
const { Pets, User, Instructions } = require("../../models");
const withAuth = require("../../utils/authorize");

/* router.get("/new-pet", withAuth, async (req, res) => {
  try {
    // console.log(req.session.user_id);
    res.render("new-pet", { loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
}); */

/* router.get("/new", withAuth, (req, res) => {
  res.render("new-pet", {
    loggedIn: req.session.loggedIn,
  });
}); */

/* router.get("/:id", withAuth, async (req, res) => {
  try {
    const petsWithInstructions = await Pets.findOne(req.params.pet_id, {
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
});

router.get("/:id", (req, res) => {
  Pets.findOne({
    where: {
      pet_id: req.params.id,
    },
    include: [Instructions],
  })
    .then((petData) => {
      if (!petData) {
        res.status(404).json({ message: "no pet found with this id!" });
      }
      res.json(petData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}); */

module.exports = router;
