const RepositoryHelper = require('../helpers/repository-helper');
const CountapiService = require('../services/countapi');

class VisitorRepository {
    constructor() {
        this.table = 'users';
        this.globalCount = 'ton';
    }

    getCount = async (session) => {
        try {
            const visits = await CountapiService.get(this.globalCount);
            const data = { visits };

            if (session) {
                const keyValidator = RepositoryHelper.keySanitization(session.user.email);
                data.yourVisits = await CountapiService.get(keyValidator);
            }

            return {
                statusCode: 200,
                data
            };
        } catch (err) {
            return {
                statusCode: 500,
                data: err.stack
            }
        }
    }

    hitCount = async (session) => {
        try {
            const visits = await CountapiService.hit(this.globalCount);
            const data = { visits };

            if (session) {
                const keyValidator = RepositoryHelper.keySanitization(session.user.email);
                data.yourVisits = await CountapiService.hit(keyValidator);
            }

            return {
                statusCode: 200,
                data
            };
        } catch (err) {
            return {
                statusCode: 500,
                data: err.stack
            }
        }
    }
}

module.exports = VisitorRepository;