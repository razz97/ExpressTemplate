
function logRequest(logger) {
    return (req, res, next) => {
        logger.info(req.method + ' ' + req.path);
        next();
    }
}

module.exports = logRequest;