/**
 * Bootstraps the server.
 * 
 * Creates a server, adds the middleware and configures express.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const {  base_url, port } =  require('./config');
const { logRequest, handleParseError, exec } = require('./autoload');
const express = require('express');
const log = require('./logger');
const router = require('./router');
const database = require('./db');

// Code is wrapped in async function to be able to wait for db connection before starting the server
exec(async () => {
    // Connect to db
    await database.connect();
    // Create a server
    const app = express();
    // Logs the request
    app.use(logRequest);
    // Parses body to JSON)
    app.use(express.json());
    // Handles parsing errors
    app.use(handleParseError);
    // Adds the routes
    app.use(base_url, router);
    // Start the server
    app.listen(port,() => log.info(`Server started at port ${port}`));
});
