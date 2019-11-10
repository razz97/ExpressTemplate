
const service = require('./sample.service');

class SampleController {

    get = async (req,res, next) => {
        const samples = await service.find().catch(err => console.log(err));
        res.json(samples);
        next();
    }

    post = (req,res, next) => {
        service.create(req.body)
            .then(() => {
                res.status(201).send();  
                next();
            }).catch((err) => res.status(500).json(err));
       
    }

    put = (req,res, next) => {
        res.json({"hi": "there"});
        next();
    }

    delete = (req,res, next) => {
        res.json({"hi": "there"});
        next();
    }
    
}

module.exports = new SampleController();