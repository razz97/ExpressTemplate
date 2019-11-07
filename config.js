/**
 * Responsible for configuration of the application.
 * 
 * This file is responsible of creating a configuration object by 
 * processing 'config.json' and checking the environment variables.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

let config =  require('./config.json');

const deployment = process.env.NODE_ENV || 'dev';

if (deployment === 'dev') {
    config = config.dev;
} else if (deployment === 'production') {
    config = config.production;
} else {
    throw `Environment variable NODE_ENV has an invalid value: ${deployment}, posible values: dev, production`;
}

config.port = process.env.PORT || config.port || 80;

module.exports = config;
