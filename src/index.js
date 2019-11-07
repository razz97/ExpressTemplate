/**
 * Bootstraps the server.
 * 
 * Creates a server, adds the middleware and configures express.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const express = require('express');
const config =  require('./config.js');

// Create a server
const app = express();

// TODO: Add middleware

// Start the server
app.listen(
    config.port,
    () => console.log(`Server started at port ${config.port}`)
);
