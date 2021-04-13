const mongoose = require('mongoose');

const ParcelSchema = mongoose.Schema({
    weight: Number,
    truckId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    required: false
    }
});

module.exports = mongoose.model('Parcel', ParcelSchema);
