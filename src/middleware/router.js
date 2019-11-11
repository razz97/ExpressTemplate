/**
 * Creates a router, adds app routes and logs them
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const express = require('express');
const { base_url } =  require('../config');
const { sample } = autoload('components','controller');
const { logRoutes, logger } = autoload('utils');

const router = express.Router();

router.route('/sample')
   .get(sample.all)
   .post(sample.post);

router.route('/sample/:id')
   .get(sample.one)
   .put(sample.put)
   .delete(sample.delete);

logRoutes(router, base_url, logger);

module.exports = router;