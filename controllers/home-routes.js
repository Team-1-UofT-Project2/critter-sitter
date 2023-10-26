// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import necessary models and utilities
const { Pets, User, Instructions } = require("../models");
const withAuth = require("../utils/authorize");

// Route to render the homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get("/login", (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the sign-up page
router.get("/sign-up", (req, res) => {
  try {
    res.render("sign-up", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the 'router' instance for use in the application
module.exports = router;
