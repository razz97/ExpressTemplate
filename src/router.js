/**
 * Creates a router, adds app routes and logs them
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const express = require('express');
const { base_url } =  require('./config');
const logger = require('./logger');
const autoload = require('./utils/autoload');
const { sample } = autoload('components','controller');
const { logRoutes } = autoload('utils');

const router = express.Router();

router.route('/sample')
   .get(sample.get)
   .post(sample.post)
   .put(sample.put)
   .delete(sample.delete);


logRoutes(router, base_url, logger);

module.exports = router;