const mongoose = require('mongoose');

const TruckSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Truck', TruckSchema);
