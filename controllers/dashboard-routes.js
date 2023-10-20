const router = require("express").Router();
const { Pets, User, Instructions } = require("../models");
const withAuth = require("../utils/authorize");

router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
