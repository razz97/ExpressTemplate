/**
 * Responsible for configuring and opening a database connection
 *  
 * @author Alex Bou.
 * @since  1.0.0
 */

const config = require('./config').database;
const { logger } = autoload('utils');
const mongoose = require('mongoose');

const url = config.protocol + 
            config.host + ':' + 
            config.port + '/' + 
            config.schema;

const options = {
    user: config.username,
    pass: config.password,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

const connect = async () => {
    await mongoose.connect(url, options).catch(err => {
        logger.error(`Error connecting to the database: ${err.message}`);
        logger.error(`Reason: ${err.reason}`);
        process.exit();
    });
    logger.info('Connected to the database');
    logger.debug('Mongodb url is: ' + url);
};

module.exports = { connect };