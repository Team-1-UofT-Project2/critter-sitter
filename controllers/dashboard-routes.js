const router = require("express").Router();
const { Pets, User, Instructions } = require("../models");
const withAuth = require("../utils/authorize");

router.get("/", withAuth, async (req, res) => {
  try {
    res.render("dashboard", { loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
