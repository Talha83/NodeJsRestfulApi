var should = require("should"),
    sinon = require("sinon");


describe('Customer Controller Tests: ', function () {
    describe("Post", function () {
        it("should not allow empty firstName on post", function () {
            var Customer = function (customer) { this.save = function () { } };
            
            var req = {
                body: {
                    lastName: "Anna"
                }
            };
            
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            
            var customerController = require("../controllers/customerController")(Customer);
            
            customerController.addCustomer(req, res);
            
            res.status.calledWith(400).should.equal(true, "Bad Status " + res.status);
            res.send.calledWith("firstName is required").should.equal(true);

        })
    })
});