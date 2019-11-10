/**
 * Middleware function to handle body parsing errors.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const { logger } = autoload('utils');

function  handleParseError(err, req, resp, next) {
    logger.error('Error while parsing JSON: ' + err.message);
    resp.status(400).json({ error: err.message });
}

module.exports = handleParseError;