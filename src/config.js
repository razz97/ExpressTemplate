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

const environment = process.env.NODE_ENV || 'dev';

if (environment != 'dev' && environment != 'production') {
    module.exports = { debug: false };
    const logger = require('./utils/logger');
    logger.error(`Environment variable NODE_ENV has an invalid value: ${environment}`);
    logger.error(`Posible values: dev, production`);
    process.exit();
}

let config = fullConfig.common;
Object.assign(config,fullConfig[environment]);
config.port = process.env.PORT || config.port || 80;
config.base_url = config.base_url || '/';
config.environment = environment;

module.exports = config;

const { logger } = autoload('utils');
logger.info(`Config succesfully loaded with environment: ${environment}`);