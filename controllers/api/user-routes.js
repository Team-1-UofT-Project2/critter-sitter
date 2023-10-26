// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import necessary models and utilities
const { User, Instructions, Pets } = require("../../models");
const withAuth = require("../../utils/authorize");

// Route for user signup
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.user_id = userData.dataValues.user_id;
    req.session.save(() => {
      req.session.user_id = userData.dataValues.user_id;
      req.session.loggedIn = true;
      res.status(200).json({
        user: userData,
        message: "You are now registered and logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const findUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
    }

    const validPassword = await findUser.checkPassword(req.body.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
    }
    req.session.user_id = findUser.dataValues.user_id;
    req.session.save(() => {
      req.session.user_id = findUser.dataValues.user_id;
      req.session.loggedIn = true;
      res.json({ user: findUser, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for user logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Export the 'router' instance for use in the application
module.exports = router;
