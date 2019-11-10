/**
 * Responsible for logging messages to the console.
 * 
 * This file is responsible of formatting and logging messages to the console, 
 * it exports an object with info, debug, warn, and error methods.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const config = require('./config');

// Colors
const WARN = '\x1b[33m%s\x1b[0m';
const ERROR = '\x1b[31m%s\x1b[0m';

// Function to compose output
const compose = (level, msg) => {
    const today = new Date();
    // Format it to 'dd/mm/yyyy hh:mm:ss'
    const formatted = twoDigits(today.getDate()) + '/' +
            twoDigits(today.getMonth() + 1) + '/' +
            today.getFullYear() + ' ' +
            twoDigits(today.getHours()) + ':' + 
            twoDigits(today.getMinutes()) + ':' + 
            twoDigits(today.getSeconds());
    return `[${formatted} - ${level}] ${msg}`;
}

// Function to force two digits on a number
const twoDigits = (number) => ('0' + number).slice(-2);


class Logger {

    constructor() {
        // Declare logging functions
        this.info = (msg) => console.log(compose('INFO ',msg));
        this.warn = (msg) => console.log(WARN, compose('WARN ',msg));
        this.error = (msg) => console.log(ERROR, compose('ERROR',msg));
        // If debug mode isn't explicitly set to true, debug function shouldn't do anything
        this.debug = config.debug === true
                        ? (msg) => console.log(compose('DEBUG',msg)) 
                        : (msg) => {};
    }

}

module.exports = new Logger();
