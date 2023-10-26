// Import the 'express' library and create a router instance
const router = require("express").Router();

// Import the 'Instructions' model from the "../../models" directory
const { Instructions } = require("../../models");

// Import the 'withAuth' middleware from the "../../utils/authorize" module
// 'withAuth' is used for authentication and authorization in routes
const withAuth = require("../../utils/authorize"); // Import the Auth middleware

// Export the 'router' instance for use in defining routes in this module
module.exports = router;
