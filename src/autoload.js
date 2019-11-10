/**
 * Dynamically loads autoExport folders.
 * 
 * For each folder specified in config.json 'autoExport' array, exports all modules contained.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const config =  require('./config');
require('./logger');
const path = require('path');
const fs = require('fs');

function dynamicExports(folder) {
    const result = {};
    
    // Get the absolute path
    const absolutePath = __dirname + '/' + folder;

    const files = [];
    const folders = [];

    // Read all files in directory, group by file/folder
    fs.readdirSync(absolutePath).forEach((file) => { 
        const lstat = fs.lstatSync(path.join(absolutePath,file));
        if (lstat.isFile()) 
            files.push(file);
        else if (lstat.isDirectory())
            folders.push(file);
    });

    // Handle files, first remove extensions
    files.map((file) => file.replace(/\.[^/.]+$/, ''))
        // Require and build exports
        .forEach((fileName) => {
            let exportedFromFile = require.main.require("./" + folder + '/' + fileName);
            result[fileName.replace('.','_')] = exportedFromFile;         
        });

    // For each folder call itself and store result in property
    folders.forEach((nestedFolder) => {
        Object.assign(result, dynamicExports(path.join(folder,nestedFolder)));
    })
    
    return result;
}

// All autoloaded modules will be exported here
config.autoExport.forEach(folder => {
    Object.assign(module.exports, dynamicExports(folder));
});