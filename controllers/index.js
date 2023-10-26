// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import route modules for different parts of the application
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

// Set up the routing for different parts of the application
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);
router.use("/dashboard/new-pet", dashboardRoutes);

// Export the 'router' instance for use in the application
module.exports = router;
