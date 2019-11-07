/**
 * Adds routes to express router.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const express = require('express');
const router = express.Router();
const config = require('../config');
const base_url = config.base_url;

router.get(base_url + '/', );