const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        if (!req.session.user) {
            const user = await User.find({ _id: decoded.id }).then(usr => usr);

            req.session.user = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                pipedrive: user[0].pipedrive,
                bling: user[0].bling,
            }
        }

        next();
    });
}

const loadRoutes = (controller) => {
    const router = express.Router();
    
    controller.filter(data => {
        if (data.auth) {
            router[data.method](data.route, this.verifyJWT, data.function);
        } else {
            router[data.method](data.route, data.function);
        }
    });

    return router;
}

module.exports = {
    verifyJWT,
    loadRoutes
};