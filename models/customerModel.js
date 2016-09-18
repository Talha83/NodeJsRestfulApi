var mongoose = require("mongoose");

var customerModel = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        addressL1: { type: String },
        addressL2: { type: String },
        addressL3: { type: String },
        postCode: { type: String },
        phoneNumber: { type: String, select: false },
        happyToAcceptCalls: { type: Boolean, default: false }        
    });

module.exports = mongoose.model("Customer", customerModel);