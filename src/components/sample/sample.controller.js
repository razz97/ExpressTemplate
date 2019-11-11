/**
 * Responsible handling requests made to /sample/*.
 * 
 * Provides an example of how a real application made with this template 
 * would implement a controller
 *  
 * @author Alex Bou.
 * @since  1.0.0
 */

const service = require('./sample.service');
const { logger } = autoload('utils');


const error = (res, err) => {
    logger.error(err.message);
    res.status(err.status).json({error: err.message});
}

const success = (res, content, status, next) => {
    res.status(status)
    if (content) res.json(content);
    else res.send();
    logger.debug('Request finished successfully');
    next();
}

class SampleController {

    all = (req, res, next) => {
        service.find(req.query)
            .then(results => success(res, results, 200, next))
            .catch(err => error(res, err));
    }

    one = (req, res, next) => {
        service.findById(req.params.id)
            .then(results => success(res, results, 200, next))
            .catch(err => error(res, err));

    }

    post = (req, res, next) => {
        service.create(req.body)
            .then(() => success(res, false, 201, next))
            .catch(err => error(res, err));
    }

    put = (req, res, next) => {
        service.update(req.params.id,req.body)
            .then(() => success(res, false, 204, next))
            .catch(err => error(res, err));
    }

    delete = (req, res, next) => {
        service.delete(req.params.id)
            .then(() => success(res, false, 204, next))
            .catch(err => error(res, err));
    }
    
}

module.exports = new SampleController();