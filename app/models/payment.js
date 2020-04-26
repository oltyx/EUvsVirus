// load the things we need
var mongoose = require('mongoose');


var paymentSchema = mongoose.Schema({
    productId: ObjectId,
    token: String,
});

module.exports = mongoose.model('Payments', paymentSchema);
