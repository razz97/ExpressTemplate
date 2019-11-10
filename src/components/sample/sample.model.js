/**
 * Responsible for creating, reading, updating and deleting Sample objects.
 * 
 * Provides an example of how a real application made with this template 
 * would implement a model
 *  
 * @author Alex Bou.
 * @since  1.0.0
 */

const mongoose = require('mongoose');

const attrs = {
    hi: {
        type: String,
        required: true
    }
}

const opts = {
    versionKey: false
}

const sampleSchema = new mongoose.Schema(attrs,opts);
const Sample = mongoose.model('Sample', sampleSchema);

module.exports = Sample;