// const User = require('../models/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');
const RepositoryHelper = require('../helpers/repository-helper');
const { SECRET: secret } = process.env;

class UserRepository {
    constructor() {
        this.table = 'users';
        this.globalCount = 'ton';
    }

    store = async (body) => {
        try {
            await axios(`https://api.countapi.xyz/hit/${this.globalCount}/count`);

            const keyValidator = RepositoryHelper.keySanitization(body.email);
            const { Item: existUser } = await RepositoryHelper.getByKey({
                TableName: this.table,
                Key: { email: body.email }
            });

            if (existUser) {
                return { statusCode: 400, data: { message: 'User already exist' } };
            }

            const salt = bcrypt.genSaltSync(10);
            body.password = bcrypt.hashSync(body.password, salt);
            const response = await axios(`https://api.countapi.xyz/hit/${keyValidator}/count`);
            body.access = response.data.value;

            await RepositoryHelper.putValues({
                TableName: this.table,
                Item: body
            });

            return { statusCode: 200, data: body };
        } catch (err) {
            return { statusCode: 500, data: err.stack };
        }
    }

    me = async (form, session) => {
        const email = session.user.email;

        const { Item: user } = await RepositoryHelper.getByKey({
            TableName: this.table,
            Key: { email }
        });

        return { statusCode: 200, data: user };
    }

    login = async (form, session) => {
        await axios(`https://api.countapi.xyz/hit/${this.globalCount}/count`);

        const response = {};
        const { Item: user } = await RepositoryHelper.getByKey({
            TableName: this.table,
            Key: { email: form.email }
        });

        if (!user) {
            return { statusCode: 404, data: { message: 'User not found' } };
        }

        const bool = bcrypt.compareSync(form.password, user.password);
        if (bool === false) {
            response.data = { message: 'Invalid password/email' };
            response.statusCode = 400;
        } else {
            const token = jwt.sign({ email: user.email }, secret, {
                algorithm: "HS256",
                expiresIn: 86400
            });

            session = {
                user: {
                    name: user.name,
                    email: user.email
                }
            }

            const keyValidator = RepositoryHelper.keySanitization(user.email);
            const { data: { value: access } } = await axios(`https://api.countapi.xyz/hit/${keyValidator}/count`);


            await RepositoryHelper.updateValues({
                TableName: this.table,
                Key: { email: user.email },
                UpdateExpression: "set access = :access",
                ExpressionAttributeValues: {
                    ":access": access
                },
                ReturnValues: "UPDATED_NEW"
            });

            response.data = { header: 'x-access-token', token: token }
            response.statusCode = 200;
        }

        return response;
    }
}


module.exports = UserRepository;