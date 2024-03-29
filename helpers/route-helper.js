const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET: secret } = process.env;

const RepositoryHelper = require('./repository-helper');

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) next();

    jwt.verify(token, secret, async function (err, decoded) {
        if (!req.session && decoded) {
            const { Item: user } = await RepositoryHelper.getByKey({
                TableName: 'users',
                Key: { email: decoded.email }
            });

            req.session = {
                user: {
                    name: user.name,
                    email: user.email
                }
            }

            next();
        }

    });
}

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, secret, async function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.email = decoded.email;
        if (!req.session) {
            const { Item: user } = await RepositoryHelper.getByKey({
                TableName: 'users',
                Key: { email: decoded.email }
            });

            req.session = {
                user: {
                    name: user.name,
                    email: user.email
                }
            }
        }

        next();
    });
}

const loadRoutes = (controller) => {
    const router = express.Router();

    controller.filter(data => {
        if (data.auth) {
            router[data.method](data.route, verifyJWT, data.function);
        } else {
            router[data.method](data.route, data.function);
        }
    });

    return router;
}

module.exports = {
    verifyJWT,
    auth,
    loadRoutes
};