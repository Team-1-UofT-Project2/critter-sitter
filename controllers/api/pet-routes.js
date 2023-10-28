// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import necessary models and utilities
const { Pets, User, Instructions } = require("../../models");
const withAuth = require("../../utils/authorize");
const { upload } = require("../../utils/image-uploader");
const path = require("path");

// Route to get a single pet with the URL parameter 'id'
router.get("/edit-pet/:id", withAuth, async (req, res) => {
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

// Route to get a single pet with the URL parameter 'id' and its associated instructions
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

// Route to create a new pet
router.post(
  "/new-pet",
  withAuth,
  upload.single("image"), // Use "imageUploader" here
  async (req, res) => {
    try {
      const newPet = await Pets.create({
        pet_name: req.body.pet_name,
        owner: req.body.owner,
        address: req.body.address,
        care_level: req.body.care_level,
        description: req.body.description,
        user_id: req.session.user_id,
        image: path.basename(req.file.path),
      });
      res.status(200).json(newPet);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Route to delete a pet by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const petData = await Pets.destroy({
      where: {
        pet_id: req.params.id,
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

// Route to edit/update an existing pet by ID
router.put("/edit/:id", withAuth, async (req, res) => {
  try {
    const petData = await Pets.findByPk(req.params.id);

    if (!petData) {
      res.status(404).json({ message: "No pet with this id!" });
      return;
    }

    petData.pet_name = req.body.pet_name;
    petData.owner = req.body.owner;
    petData.address = req.body.address;
    petData.description = req.body.description;
    petData.care_level = req.body.care_level;

    await petData.save();

    res.status(200).json({ message: "Pet updated successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ err: "Internal Server Error", details: err.message });
  }
});

// Export the 'router' instance for use in the application
module.exports = router;
