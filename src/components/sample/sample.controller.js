/**
 * Responsible handling requests made to /sample.
 * 
 * Provides an example of how a real application made with this template 
 * would implement a controller
 *  
 * @author Alex Bou.
 * @since  1.0.0
 */

const service = require('./sample.service');

class SampleController {

    get = async (req,res, next) => {
        const samples = await service.find().catch(err => console.log(err));
        res.json(samples);
        next();
    }

    post = async (req,res, next) => {
        await service.create(req.body).catch(err => res.status(500).json(err));
        res.status(201).send();
        next();
    }

    put = async (req,res, next) => {
        await service.update(req.body).catch(err => res.status(500).json(err));
        res.status(200).send();
        next();
    }

    delete = async (req,res,next) => {
        await service.delete(req.param.id).catch(err => res.status(500).json(err));
        res.status(200).send();
        next();
    }
    
}

module.exports = new SampleController();