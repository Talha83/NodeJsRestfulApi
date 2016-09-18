var customerController = function (Customer) {
    
    var addCustomer = function (req, res) {
        
        var customer = new Customer(req.body);
        
        if (!req.body.firstName) {
            res.status(400);
            res.send("firstName is required");
        }
        else {
            customer.save();
            res.status(201);
            res.send(customer);
        }
    };
    
    var getCustomers = function (req, res) {
        
        var query = {};
        
        if (req.query.firstName) {
            query.firstName = req.query.firstName;
        }
        
        Customer.find(query, function (err, customers) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(customers);
            }
        });
    };
    
    var getCustomer = function (req, res, next) {
        
        Customer.findById(req.params.customerId, function (err, customer) {
            if (err) {
                //console.log(err);
                res.status(500).send(err);
            } else if (customer) {
                req.customer = customer;
                next();
            } else {
                res.status(404).send('no customer found');
            }
        });
    };
    
    var deleteCustomer = function (req, res) {
        req.customer.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('removed');
            }
        });
    };
    
    var replaceCustomer = function (req, res) {
        req.customer.firstName = req.body.firstName;
        req.customer.lastName = req.body.lastName;
        req.customer.addressL1 = req.body.addressL1;
        req.customer.addressL2 = req.body.addressL2;
        req.customer.addressL3 = req.body.addressL3;
        req.customer.postCode = req.body.postCode;
        req.customer.phoneNumber = req.body.phoneNumber;
        req.customer.happyToAcceptCalls = req.body.happyToAcceptCalls;
        req.customer.save(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.customer);
            }
        });
    };
    
    var updateCustomer = function (req, res) {
        
        if (req.body._id) {
            delete req.body._id;
        }
        
        for (var p in req.body) {
            req.customer[p] = req.body[p];
        }
        req.customer.save(function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.customer);
            }
        });
    };
    

    return {
        addCustomer: addCustomer,
        getCustomers: getCustomers,
        deleteCustomer: deleteCustomer,
        replaceCustomer: replaceCustomer,
        updateCustomer: updateCustomer,
        getCustomer: getCustomer,
    };
};

module.exports = customerController;