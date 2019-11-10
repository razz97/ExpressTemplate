/**
 * Util function to wrap an async function and executing it
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */
const exec = (func) => {
    func();
}

module.exports = exec;