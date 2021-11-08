const visitorController = require('../controllers/visitor-controller');
const Route = require('./route');

class VisitorRoute {
    constructor() {
         this.router = Route.loadRoutes([
            { method: 'get', route: '', function: visitorController.getCount },
            { method: 'post', route: '', function: visitorController.hitCount },
        ]);
    }
}

module.exports = new VisitorRoute().router;