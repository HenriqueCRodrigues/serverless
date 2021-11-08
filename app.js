require('dotenv').config();
const RouteHelper = require('./helpers/route-helper');
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const routes = [
    {
        file: 'visitors', auth: false, info: [
            { path: require('./routes/visitor-route'), name: '/visitors' }
        ],
    },
    {
        file: 'user', info: [
            { path: require('./routes/user-route'), name: '/user' }
        ],
    }
];

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

routes.filter(routesCollection => {
    routesCollection.info.filter(data => {
        if (routesCollection.auth) {
            app.use(data.name, RouteHelper.auth, data.path);
        } else {
            app.use(data.name, RouteHelper.verifyJWT, data.path);
        }
    });
});

// app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);