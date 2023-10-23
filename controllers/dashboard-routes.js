const router = require("express").Router();
const { Pets, User, Instructions } = require("../models");
const withAuth = require("../utils/authorize");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    console.log(req.session.user_id);
    res.render("dashboard", { loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get all pets from user that is logged in
/*router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const petData = await Pets.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User],
      raw: true,
      nest: true,
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      loggedIn: true,
      pets: petData,
    });
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});*/

module.exports = router;
