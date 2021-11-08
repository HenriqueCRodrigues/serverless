const axios = require("axios");
// const jwt = require('jsonwebtoken');

class VisitorRepository {
    getCount = async () => {
        try {
            const namespace = 'henrique';
            const key = 'test';

            const response = await axios(`https://api.countapi.xyz/get/${namespace}/${key}`);
            const data = { value: response.data.value };

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

    hitCount = async () => {
        try {
            const namespace = 'henrique';
            const key = 'test';

            const response = await axios(`https://api.countapi.xyz/hit/${namespace}/${key}`);
            const data = { value: response.data.value };

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