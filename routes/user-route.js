const userController = require('../controllers/user-controller');
const RouteHelper = require('../helpers/route-helper');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

class UserRoute {
    constructor() {
        this.router = RouteHelper.loadRoutes([
            { method: 'post', route: '', function: userController.store },
            { method: 'post', route: '/login', function: userController.login },
            { method: 'get', route: '/me', function: userController.me, auth: true }
        ]);
    }
}


module.exports = new UserRoute().router;