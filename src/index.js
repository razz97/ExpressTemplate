/**
 * Bootstraps the server.
 * 
 * Creates a server, adds the middleware and configures express.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

// First thing is to make autoloader function global
global.autoload = require('./autoload');

const { base_url, port } =  require('./config');
const { logRequest, handleParseError, router } = autoload('middleware');
const { exec, logger } = autoload('utils');
const express = require('express');
const database = require('./database');

// Code is wrapped in async function to be able to wait any promise before 
// starting the server, avoiding nesting promises
exec(async () => {
    await database.connect();
    const app = express();
    app.use(logRequest);
    app.use(express.json());
    app.use(handleParseError);
    app.use(base_url, router);
    app.listen(port,() => logger.info(`Server started at port ${port}`));
});
