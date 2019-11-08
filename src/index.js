/**
 * Bootstraps the server.
 * 
 * Creates a server, adds the middleware and configures express.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const config =  require('./config');
const express = require('express');
const router = require('./router');
const logger = require('./logger');
const { logRequest, handleParseError } = require('./autoload').middleware;

// Create a server
const app = express();

// Middleware

// Logs the request
app.use(logRequest);

// Parses body to JSON)
app.use(express.json());

// Handles parsing errors
app.use(handleParseError);

// Adds the routes
app.use(config.base_url, router);

// Start the server
app.listen(
    config.port,
    () => logger.info(`Server started at port ${config.port}`)
);
