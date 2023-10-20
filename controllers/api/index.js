const router = require("express").Router();
const instructionsRoutes = require("./instruction-routes");
const petRoutes = require("./pet-routes");
const userRoutes = require("./user-routes");

router.use("/instructions", instructionsRoutes);
router.use("/pets", petRoutes);
router.use("/users", userRoutes);

module.exports = router;
