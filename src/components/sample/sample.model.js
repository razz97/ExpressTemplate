const mongoose = require('mongoose');


const attrs = {
    hi: {
        type: String,
        required: true,
    }
}

const opts = {
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
        }
    }
}

const sampleSchema = new mongoose.Schema({

}, {versionKey: false});
const Sample = mongoose.model('Sample', sampleSchema);


module.exports = Sample;