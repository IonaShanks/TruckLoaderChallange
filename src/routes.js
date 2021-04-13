module.exports = (app) => {
    const trucks = require('./truck.controller.js');
    const parcels = require('./parcel.controller.js');


    // Create a new Truck
    app.post('/trucks', trucks.create);
    // Get all Trucks
    app.get('/trucks', trucks.findAll);
    // Get a single truck using truck ID
    app.get('/trucks/:truckID', trucks.findOne);


    // Create a new Parcel
    app.post('/parcels', parcels.create);
    // Get all parcels
    app.get('/parcels', parcels.findAll);
    // Get a single parcel using parcel ID
    app.get('/parcels/:parcelID', parcels.findOne);


    // Get all parcels assigned to a specific truck with truckID
    app.get('/parcelsbytruck/:truckID', parcels.findTruckOne);
    // Get the weight of all the parcels on each truck
    app.get('/truckWeight', parcels.findTruckWeight);
    // Get the count of parcels by truck ID
    app.get('/parcelCount/:truckID', parcels.findParcelCount);
    //Assign a truck to a parcel
    //null to unload or new id to change truck/assign truck
    app.put('/loadParcel/:parcelID', parcels.update);
}
