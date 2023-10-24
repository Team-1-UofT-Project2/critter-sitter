const router = require("express").Router();
const { Pets, User, Instructions } = require("../../models");
const withAuth = require("../../utils/authorize");
//const { upload } = require('../../utils/image-uploader')

// Route to get a single pet with the url id
router.get("/edit-pet/:id", withAuth, async (req, res) => {
  console.log("Edit pet route hit");
  try {
    const petData = await Pets.findByPk(req.params.id);

    if (!petData) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const pet = petData.get({ plain: true });
    res.render("edit-pet", {
      pet: pet,
      loggedIn: req.session.user_id ? true : false,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.post("/new-pet", withAuth, async (req, res) => {
  try {
    const newPet = await Pets.create({
      pet_name: req.body.pet_name,
      owner: req.body.owner,
      address: req.body.address,
      care_level: req.body.care_level,
      description: req.body.description,
      user_id: req.session.user_id,
      //image: req.file.path // adding the user_id to associate the pet with the logged-in user
    });

    res.status(200).json(newPet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const petData = await Pets.destroy({
      where: {
        pet_id: req.params.id,
        // user_id: req.session.user_id, // Ensure the user can only delete their own pets
        // commented out because user_id is undefined and prevents from deleting pet
      },
    });

    if (!petData) {
      res.status(404).json({ message: "No pet found with this id!" });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    console.error("Error while deleting pet:", err);
    res.status(500).json(err);
  }
});

router.put("/edit/:id", withAuth, async (req, res) => {
  try {
    const petData = await Pets.findByPk(req.params.id);

    if (!petData) {
      res.status(404).json({ message: "No pet with this id!" });
      return;
    }

    console.log(petData);

    petData.pet_name = req.body.pet_name;
    petData.owner = req.body.owner;
    petData.address = req.body.address;
    // petData.care_level = req.body.care_level;
    petData.description = req.body.description;

    await petData.save();

    res.status(200).json({ message: "Pet updated successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ err: "Internal Server Error", details: err.message });
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
