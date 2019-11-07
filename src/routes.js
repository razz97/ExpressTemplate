/**
 * Adds routes to express router.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const express = require('express');
const router = express.Router();

router.get('/sample-route', (req,resp) => resp.json({"Hello": "World"}));

module.exports = router;