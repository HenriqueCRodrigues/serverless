const userController = require('../controllers/user-controller');
const Route = require('./route');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

class UserRoute {
    constructor() {
        this.router = Route.loadRoutes([
            { method: 'post', route: '', function: userController.store },
            { method: 'post', route: '/login', function: userController.login },
            { method: 'get', route: '/me', function: userController.me }
        ]);
    }
}


module.exports = new UserRoute().router;