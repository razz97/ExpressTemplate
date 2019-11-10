/**
 * Bootstraps the server.
 * 
 * Creates a server, adds the middleware and configures express.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const {  base_url, port } =  require('./config');
const { logRequest, handleParseError } = require('./utils/autoload')('middleware');
const { exec } = require('./utils/autoload')('utils');
const express = require('express');
const log = require('./logger');
const router = require('./router');
const database = require('./database');

// Code is wrapped in async function to be able to await for any async 
// function before starting the server without nesting promises results
exec(async () => {
    await database.connect();
    const app = express();
    app.use(logRequest);
    app.use(express.json());
    app.use(handleParseError);
    app.use(base_url, router);
    app.listen(port,() => log.info(`Server started at port ${port}`));
});
