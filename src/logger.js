const EventEmitter = require('events');
const { curDate } = require('./utils');
const config = require('./config');

const LogLevel = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG'
};
const Colors = {
    WARN: '\x1b[33m%s\x1b[0m',
    ERROR: '\x1b[31m%s\x1b[0m'
}

const composeLog = (level, msg) => curDate() + ' - ' + level + ': ' + msg;

const logger = new EventEmitter();

logger.on(LogLevel.INFO, (msg) => console.info(composeLog(LogLevel.INFO,msg)));

logger.on(LogLevel.WARN, (msg) => console.warn(Colors.WARN,composeLog(LogLevel.WARN,msg)));

logger.on(LogLevel.ERROR, (msg) => console.error(Colors.ERROR,composeLog(LogLevel.ERROR,msg)));

logger.on(LogLevel.DEBUG, (msg) => {
    if (config.environment == 'dev') {
        console.debug(logger.composeLog(LogLevel.DEBUG,msg));
    }
});

module.exports = {
    logger,
    LogLevel
}








