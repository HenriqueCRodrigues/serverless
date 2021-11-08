const visitorController = require('../controllers/visitor-controller');
const RouteHelper = require('../helpers/route-helper');

class VisitorRoute {
    constructor() {
         this.router = RouteHelper.loadRoutes([
            { method: 'get', route: '', function: visitorController.getCount },
            { method: 'post', route: '', function: visitorController.hitCount },
        ]);
    }
}

module.exports = new VisitorRoute().router;