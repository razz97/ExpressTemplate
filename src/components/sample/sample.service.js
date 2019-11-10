
const SampleModel = require('./sample.model');

class SampleService {

    async find() {
        return SampleModel.find();
    }

    async create(hi) {
        return new SampleModel(hi).save();
    }
        
    
}








module.exports = new SampleService();