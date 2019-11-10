/**
 * Util function to log all routes from a router.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const logger = require('../logger');

function logRoutes(router,base_url) {
    router.stack.forEach((layer) => {
        layer.route.stack.forEach((route) => {
            logger.info(`Route mappped: ${route.method.toUpperCase()} ${base_url + layer.route.path}`);
        });
    });
}

module.exports = logRoutes;