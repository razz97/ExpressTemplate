/**
 * Dynamically loads autoExport folders.
 * 
 * For each folder specified in config.json 'autoExport' array, exports all modules contained.
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const config =  require('./config');
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
    files.map((file) => file.replace(/\.[^/.]+$/, ""))
        // Require and build exports
        .forEach((fileName) => {
            let exportedFromFile = require("./" + folder + '/' + fileName);
            buildExports(exportedFromFile, result, fileName);            
        });

    // For each folder call itself and store result in property
    folders.forEach((folder) => {
        result[folder] = dynamicExports(path.join(dir,folder))
    })
    
    return result;
}

function buildExports(exportedFromFile, Exports, fileName) {

    // If null or undefined return
    if (!exportedFromFile) return;

    // If object call itself foreach key
    if (typeof exportedFromFile === 'object') {
        for (let key in exportedFromFile) 
            buildExports(exportedFromFile[key], Exports, key);

    // Else add to exports
    } else Exports[fileName] = exportedFromFile;
}

// All autoloaded modules will be exported here
config.autoExport.forEach(folder => {
    module.exports[folder] = dynamicExports(folder);
});