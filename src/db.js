
const config = require('./config').database;
const logger = require('./logger');
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





function connected() {
    // var kittySchema = new mongoose.Schema({
    //     name: String
    // });
    // var Kitten = mongoose.model('Kitten', kittySchema);
    // var silence = new Kitten({ name: 'Silence' });
    // console.log(silence.name); // 'Silence'
    // silence.save((err) => {
    //     if (err) logger.error(err);
    //     else logger.info('silence saved!');
    // })
}


