/**
 * Responsible for validating business logic to /samples requests
 * 
 * Provides an example of how a real application made with this template 
 * would implement a service
 *  
 * @author Alex Bou.
 * @since  1.0.0
 */

const {SampleModel, attrs } = require('./sample.model');
const SampleError = require('../../errors/errors');


class SampleService {

    async find(query) {
        try {
            const possible = Object.keys(attrs);
            const askedFor = Object.keys(query); 
            for (const key of askedFor) {
                if (!possible.includes(key)) 
                    throw new SampleError(400, 'Invalid parameter: ' + key);                
            }
            return SampleModel.find(query);
        } catch(err) {
            if (err instanceof SampleError) throw err;
            throw new SampleError(500, err.message ? err.message : 'Unexpected server error');
        }
    }

    async findById(id) {
        const sample = await SampleModel.findById(id);
        if (sample)
            return sample;
        throw new SampleError(404,'Not found');    
    }

    create(hi) {
        return new SampleModel(hi).save();
    }

    async update(id,updated) {
        const original = await this.findById(id);
        if (updated.hi) {
            original.hi = updated.hi;
        }
        return sample.save();
    }

    async delete(id) {
        const sample = await this.findById(id);
        return sample.delete();
    }
}








module.exports = new SampleService();