var express = require('express');

var routes = function (Customer) {
    
    var apiRouter = express.Router();
    
    var customerController = require("../controllers/customerController")(Customer);
    
    apiRouter.route('/')
	.post(customerController.addCustomer)
	.get(customerController.getCustomers);
    
    // Middleware
    apiRouter.use('/:customerId', customerController.getCustomer);
    
    apiRouter.route('/:customerId')
	.get(function (req, res) { res.json(req.customer); })
    .delete(customerController.deleteCustomer)
    .put(customerController.replaceCustomer)
    .patch(customerController.updateCustomer);
    
    return apiRouter;
};

module.exports = routes;