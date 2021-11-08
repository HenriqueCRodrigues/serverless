// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

class UserRepository {
    store = async (body) => {
        return { statusCode: 200, data: body };
    }

    me = async (form, session) => {
        return { statusCode: 200, data: { user: 'OK' } };
    }

    login = async (form, session) => {
        return { statusCode: 200, data: { header: 'x-access-token', token: 'ABCD1234' } };
    }
}


module.exports = UserRepository;