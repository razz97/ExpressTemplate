/**
 * Bootstraps the server.
 * 
 * Creates a server, adds the middleware and configures express.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const express = require('express');
const config =  require('./config');
const routes = require('./routes');
const { logger, LogLevel } = require('./logger')

// Create a server
const app = express();

// Check valid json
//app.use();

// Add parser (body to JSON)
app.use((req, resp, next) => {
    express.json()(req, resp, err => {
        if (!err) {
            next();
            return;
        }
        resp.status(400);
        resp.json({"error":"Invalid JSON"});
    });
});

// Add routes
app.use(config.base_url, routes);

// Start the server
app.listen(
    config.port,
    () => logger.emit(LogLevel.INFO,`Server started at port ${config.port}`)
);
