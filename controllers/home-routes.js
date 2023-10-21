const router = require("express").Router();
const { Pets, User, Instructions } = require("../models");
const withAuth = require("../utils/authorize");

router.get("/", async (req, res) => {
  try {
    res.render("homepage" /* , { loggedIn: req.session.loggedIn } */);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("login" /* { loggedIn: req.session.loggedIn } */);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sign-up", (req, res) => {
  try {
    res.render("sign-up" /* { loggedIn: req.session.loggedIn } */);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});*/

router.get("/results", async (req, res) => {
  Pets.findAll({
    where: {
      care_level: req.query.care_level,
    },
  }).then((petData) => {
    if (!petData) {
      res.status(404).json({ message: "no pets with this criteria" });
      return;
    }
    const results = petData.map((pet) => pet.get({ plain: true }));
    res.render("results", { loggedIn: req.session.loggedIn, results });
  });
});

module.exports = router;
