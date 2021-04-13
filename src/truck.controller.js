const Truck = require('./truck.model.js');

// Create and Save a new truck
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Truck must have a name"
        });
    }

    // Create a truck
    const truck = new Truck({
        name: req.body.name
    });

    // Save truck in the database
    truck.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Truck."
        });
    });
};

// Get all trucks from the database.
exports.findAll = (req, res) => {
    Truck.find()
    .then(trucks => {
        res.send(trucks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving Trucks."
        });
    });
};

// Find a single truck using the truckId
exports.findOne = (req, res) => {
    Truck.findById(req.params.truckID)
    .then(truck => {
        if(!truck) {
            return res.status(404).send({
                message: "Truck not found with id " + req.params.truckID
            });
        }
        res.send(truck);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Truck not found with id " + req.params.truckID
            });
        }
        return res.status(500).send({
            message: "Error retrieving truck with id " + req.params.truckID
        });
    });
};
