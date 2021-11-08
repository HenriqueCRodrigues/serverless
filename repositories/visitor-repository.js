// const jwt = require('jsonwebtoken');

class VisitorRepository {
    getCount = () => {
        try {
            return {
                statusCode: 200,
                data: 'Busca contagem'
            };
        } catch (err) {
            return {
                statusCode: 500,
                data: err.stack
            }
        }
    }

    hitCount = () => {
        try {
            return {
                statusCode: 200,
                data: 'Insere contagem'
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