/**
 * Responsible for validating business logic to /samples requests
 * 
 * Provides an example of how a real application made with this template 
 * would implement a service
 *  
 * @author Alex Bou.
 * @since  1.0.0
 */

const SampleModel = require('./sample.model');

class SampleService {
    async find() {
        return SampleModel.find();
    }

    async create(hi) {
        return new SampleModel(hi).save();
    }

    async findById(id) {
        throw '';
        return await SampleModel.findById(id);
    }
}








module.exports = new SampleService();