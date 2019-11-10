/**
 * Loads all files exports from a folder recursively.
 * 
 * If type is specified, loads only those files that contain type in the name
 * 
 * @author Alex Bou.
 * @since  1.0.0
 */

const path = require('path');
const fs = require('fs');
const logger = require('../logger');

const extensionRegex = /\.[^/.]+$/;

function autoload(folder, type) {
    if (type) 
        return autoloadWithType(folder, type);
    if (isCached(folder)) 
        return getCached(folder);
    const result = {};
    const { files, folders } = getGroupedContents(folder);
    // Remove extensions, require the file and save it in result
    files.map(file => file.replace(extensionRegex, ''))
        .forEach((fileName) => {
            let exportedFromFile = require.main.require("./" + folder + '/' + fileName);
            result[fileName.replace('.','_')] = exportedFromFile;         
        });
    // For each folder call itself and merge into result
    folders.forEach((nestedFolder) => {
        Object.assign(result, autoload(path.join(folder,nestedFolder)));
    });
    cache(folder,result);
    return result;
}

function autoloadWithType(folder, type) {
    if (isCached(folder,type)) 
        return getCached(folder, type);
    const typeRegex = new RegExp('\.' + type + '+$');
    if (isCached(folder)) 
        return getTypedFromFolderCache(folder, type, typeRegex);
    const result = {};
    const { files, folders } = getGroupedContents(folder);
    // Remove extensions and filter by type, then require the file and save it in result
    files.map(file => file.replace(extensionRegex, ''))
        .filter(file => file.match(typeRegex))
        .forEach(file => {
            let exportedFromFile = require.main.require("./" + folder + '/' + file);
            result[file.replace('.','_').replace(typeRegex, '')] = exportedFromFile;         
        });
    // For each folder call itself and merge it into result
    folders.forEach(nestedFolder => {
        Object.assign(result, autoloadWithType(path.join(folder,nestedFolder),type));
    });
    cache(folder, result, type);
    return result;
}

const getTypedFromFolderCache = (folder, type, typeRegex) => {
    const cachedFolder = getCached(folder);
    const result = {};
    // Filter values that match type and  store them in result removing the regex part from the key
    Object.entries(cachedFolder)
        .filter(entry => entry[0].match(typeRegex))
        .forEach(entry => result[entry[0].replace(typeRegex,'')] = entry[1]);
    cache(folder, result, type);
    return result;
} 

const getGroupedContents = (folder) => {
    const absolutePath = path.join(__dirname.replace('utils',''), folder);
    const result = { files: [], folders: []};
    // Read all files in directory, group by file/folder
    fs.readdirSync(absolutePath).forEach(file => { 
        const lstat = fs.lstatSync(path.join(absolutePath,file));
        if (lstat.isFile()) 
            result.files.push(file);
        else if (lstat.isDirectory())
            result.folders.push(file);
    });
    return result;
}

const folderCache = [];
const typedCache = [];

const isCached = (folder, type) => {
    if (type) {
        if (typedCache[folder + '-' + type]) {
            logger.debug('Autoloader typed cache hit: ' + folder + '-' + type);
            return true;
        }
        return false;
    }
    if (folderCache[folder]) {
        logger.debug('Autoloader cache hit: ' + folder);
        return true;
    }
    return false;
} 

const cache = (folder, result, type) => {
    if (type)
        typedCache[folder + '-' + type] = result;
    else
        folderCache[folder] = result;
};

const getCached = (folder, type) => {
    if (type)
        return typedCache[folder + '-' + type];
    return folderCache[folder];
}

module.exports = autoload;