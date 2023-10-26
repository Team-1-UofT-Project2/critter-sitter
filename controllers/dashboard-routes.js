// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import necessary models and utilities
const { Pets, User, Instructions } = require("../models");
const withAuth = require("../utils/authorize");

// Route to render the user's dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const petData = await Pets.findAll({
      where: {
        user_id: req.session.user_id,
      },
      raw: true,
      nest: true,
    });

    res.render("dashboard", { loggedIn: true, pets: petData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render a form for adding a new pet
router.get("/new-pet", withAuth, async (req, res) => {
  try {
    res.render("new-pet", { loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the 'router' instance for use in the application
module.exports = router;
