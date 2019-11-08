const logger  = require('../logger');

function logRequest(req, res, next) {
    logger.info(req.method + ' ' + req.path);
    next();
}

module.exports = logRequest;