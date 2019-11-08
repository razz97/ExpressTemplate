
module.exports.logRoutes = (base_url, router, logger) => {
    router.stack.forEach((layer) => {
        layer.route.stack.forEach((route) => {
            logger.info(`Route mappped: ${route.method.toUpperCase()} ${base_url + layer.route.path}`);
        });
    });
}