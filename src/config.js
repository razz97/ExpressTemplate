/**
 * Responsible for configuration of the application.
 * 
 * This file is responsible of creating a configuration object by 
 * processing 'config.json' and checking the environment variables.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const fullConfig =  require('../config.json');

// Check for produc/dev
const environment = process.env.NODE_ENV || 'dev';

// Make sure environment is correct
if (environment != 'dev' && environment != 'production') {
    throw `Environment variable NODE_ENV has an invalid value: ${environment}, 
           posible values: dev, production`;
}
// Initialize config with common values
let config = fullConfig.common;
// Merge environment specific values to config
Object.assign(config,fullConfig[environment]);
// Make sure port is set, prioritize enviroment variable.
config.port = process.env.PORT || config.port || 80;
// Set the environment
config.environment = environment

module.exports = config;
