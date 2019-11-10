/**
 * Creates a router, adds app routes and logs them
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const express = require('express');
const config =  require('./config');
const logger = require('./logger');
const all = require('./autoload');

// Create a router
const router = express.Router();

// Declare routes
router.route('/sample')
   .get(all.sample_controller.get)
   .post(all.sample_controller.post)
   .put(all.sample_controller.put)
   .delete(all.sample_controller.delete);


// Log routes
all.logRoutes(router,config.base_url,logger);

module.exports = router;