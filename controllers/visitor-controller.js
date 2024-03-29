const VisitorRepository = require('../repositories/visitor-repository');

class VisitorController {

    constructor() {
        this.visitorRepository = new VisitorRepository();
    }

    getCount = async (req, res, next) => {
        const { statusCode, data } = await this.visitorRepository.getCount(req.session);
        res.status(statusCode).send(data);
    }

    hitCount = async (req, res, next) => {
        const { statusCode, data } = await this.visitorRepository.hitCount(req.session);
        res.status(statusCode).send(data);
    }
}

module.exports = new VisitorController();