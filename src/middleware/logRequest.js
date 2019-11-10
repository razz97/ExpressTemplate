/**
 * Middleware function to log all requests.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

 const logger = require('../logger');

function logRequest(req, res, next) {
    logger.info(req.method + ' ' + req.path);
    next();
}

module.exports = logRequest;