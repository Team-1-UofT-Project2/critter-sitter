// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import the route handlers for instructions, pets, and users
const instructionsRoutes = require("./instruction-routes");
const petRoutes = require("./pet-routes");
const userRoutes = require("./user-routes");

// Define the routes for different parts of the application and specify their route handlers
router.use("/instructions", instructionsRoutes);
router.use("/pets", petRoutes);
router.use("/users", userRoutes);

// Export the 'router' instance to be used in the application
module.exports = router;
