/**
 * Creates a router, adds app routes and logs them
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const express = require('express');
const config =  require('./config');
const logger = require('./logger');
const { logRoutes } = require('./autoload').utils;

// Create a router
const router = express.Router();

// Declare routes
router.get('/sample-route', (req,resp) => resp.json({"Hello": "World"}));
router.get('/sample-route1', (req,resp) => resp.json({"Hello": "World"}));

// Log routes
logRoutes(config.base_url, router, logger);

module.exports = router;