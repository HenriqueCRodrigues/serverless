const UserRepository = require('../repositories/user-repository');

class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    store = async (req, res, next) => {
        const { statusCode, data } = await this.userRepository.store(req.body);
        res.status(statusCode).send(data);
    }

    login = async (req, res, next) => {
        const { statusCode, data } = await this.userRepository.login(req.body, req.session);
        res.status(statusCode).send(data);
    }

    me = async (req, res, next) => {
        const { statusCode, data } = await this.userRepository.me(req.session);
        res.status(statusCode).send(data);
    }

}

module.exports = new UserController();