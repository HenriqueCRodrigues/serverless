// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { DynamoDB } = require('aws-sdk');
const axios = require('axios');
const bcrypt = require('bcrypt');

class UserRepository {
    constructor() {
        this.table = 'users';
    }

    putValues = async (params) => {
        const dynamoClient = new DynamoDB.DocumentClient();
        return dynamoClient.put(params).promise();
    }

    getByKey = async (params) => {
        const dynamoClient = new DynamoDB.DocumentClient();
        return dynamoClient.get(params).promise();
    }

    store = async (body) => {
        try {
            await axios(`https://api.countapi.xyz/hit/ton/count`);

            const keyValidator = body.email.replace(/[^\w\s]/gi, '');
            const { Item: existUser } = await this.getByKey({
                TableName: this.table,
                Key: { email: body.email }
            });

            if (existUser) {
                return { statusCode: 400, data: {message: 'User already exist'} };
            }

            const salt = bcrypt.genSaltSync(10);
            body.password = bcrypt.hashSync(body.password, salt);
            const response = await axios(`https://api.countapi.xyz/hit/${keyValidator}/count`);
            body.access = response.data.value;

            await this.putValues({
                TableName: this.table,
                Item: body
            });

            return { statusCode: 200, data: body };
        } catch (err) {
            return { statusCode: 500, data: err.stack };
        }
    }

    me = async (form, session) => {
        const email = 'a@a.com';

        const params = {
            TableName: this.table,
            Key: {
                email
            }
        };

        const dynamoClient = new DynamoDB.DocumentClient();
        const getMe = await dynamoClient.get(params).promise();
        const user = getMe.Item;
        const response = await axios(`https://api.countapi.xyz/get/${user.email}/count`);
        user.access = response.data.value;

        return { statusCode: 200, data: { user } };
    }

    login = async (form, session) => {
        await axios(`https://api.countapi.xyz/hit/ton/count`);

        return { statusCode: 200, data: { header: 'x-access-token', token: 'ABCD1234' } };
    }
}


module.exports = UserRepository;