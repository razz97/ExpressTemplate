/**
 * Responsible for logging messages to the console.
 * 
 * This file is responsible of formatting and logging messages to the console, 
 * it exports an object with info, debug, warn, and error methods.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const config = require('../config');
const path = require('path');

// Colors
const WARN = '\x1b[33m%s\x1b[0m';
const ERROR = '\x1b[31m%s\x1b[0m';

class Logger {
    constructor() {
        this.info = (msg) => console.log(compose('INFO ',msg));
        this.warn = (msg) => console.log(WARN, compose('WARN ',msg));
        this.error = (msg) => console.log(ERROR, compose('ERROR',msg));
        // If debug mode isn't explicitly set to true, debug function shouldn't do anything
        this.debug = config.debug === true
                        ? (msg) => console.log(compose('DEBUG',msg)) 
                        : () => {};
    }
}

// Function to compose messages, adds date and log level,
// if debug is enabled, composes file and line as well
const compose = config.debug === true  
    ? (level, msg) => `[${curDate()} - ${level} - ${file()}: ${line()}] ${msg}`
    : (level, msg) => `[${curDate()} - ${level}] ${msg}`

// Gets current date in the format: 'dd/mm/yyyy hh:mm:ss'
const curDate = () => {
    const today = new Date();
    return twoDigits(today.getDate()) + '/' +
            twoDigits(today.getMonth() + 1) + '/' +
            today.getFullYear() + ' ' +
            twoDigits(today.getHours()) + ':' + 
            twoDigits(today.getMinutes()) + ':' + 
            twoDigits(today.getSeconds());
}

// Function to force two digits on a number
const twoDigits = (number) => ('0' + number).slice(-2);

// Gets the stack of the logger caller
// Careful as this takes into account that it'll be called by:
// First either line/func/file, then compose, lastly either info/debug/warn/error
const stack = () => {
    // Save original prepare method
    var orig = Error.prepareStackTrace;
    // Make it return the stack
    Error.prepareStackTrace = function(_, stack) {
        return stack;
    };
    // Cause an error
    var err = new Error;
    // Get the stack
    var stack = err.stack;
    // Recover the original method
    Error.prepareStackTrace = orig;
    // Shift to logger caller
    stack.shift();
    stack.shift();
    stack.shift();
    return stack;
}
// Gets the line where logger was called
const line = () => stack()[1].getLineNumber();
// Gets the file where the logger was called
const file = () => path.parse(stack()[1].getFileName()).name;
    
module.exports = new Logger();
