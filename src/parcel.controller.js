const Parcel = require('./parcel.model.js');

// Create and Save a new parcel
exports.create = (req, res) => {
    // Validate request
    if(!req.body.weight) {
        return res.status(400).send({
            message: "Parcel must have a weight"
        });
    }

    // Create a parcel
    const parcel = new Parcel({
        weight: req.body.weight,
        truckId: null
    });

    // Save parcel in the database
    parcel.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Parcel."
        });
    });
};


// Get all the parcels from the database.
exports.findAll = (req, res) => {
    Parcel.find()
    .then(parcels => {
        res.send(parcels);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Parcels."
        });
    });
};


// Find a single parcel with a parcelID
exports.findOne = (req, res) => {
    Parcel.findById(req.params.parcelID)
    .then(parcel => {
        if(!parcel) {
            return res.status(404).send({
                message: "Parcel not found with id " + req.params.parcelID
            });
        }
        res.send(parcel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Parcel not found with id " + req.params.parcelID
            });
        }
        return res.status(500).send({
            message: "Error retrieving parcel with id " + req.params.parcelID
        });
    });
};


// Get all packages for a specific truck
exports.findTruckOne = (req, res) => {
    Parcel.find({truckId :req.params.truckID})
    .then(parcel => {
        if(!parcel) {
            return res.status(404).send({
                message: "Truck not found with id " + req.params.truckID
            });
        }
        res.send(parcel);
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


// Gets the weight of all packages by truck
exports.findTruckWeight = (req, res) => {
  Parcel.aggregate([
          { $group: { _id: "$truckId", totalWeight: { $sum: "$weight" } } }
  ]).then(parcel => {
        if(!parcel) {
            return res.status(404).send({
                message: "Truck not found with id " + req.params.truckID
            });
        }
        res.send(parcel);
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


// Gets a count of packages assigned to a specific truck
exports.findParcelCount = (req, res) => {
  Parcel.count({truckId :req.params.truckID},
    function(err, result) {
      if(err) {
        return res.status(404).send({
            message: "Truck not found with id " + req.params.truckID
        });
      }
      else {
        res.json("There are " + result + " Parcels on truck " + req.params.truckID);
      }
    });
  };


// Update a parcel identified by the parcelID in the request
exports.update = (req, res) => {
    // Find parcel and update it with the request body
    Parcel.findByIdAndUpdate(req.params.parcelID, {
      truckId: req.body.truckId
    }, {new: true})
    .then(parcel => {
        if(!parcel) {
            return res.status(404).send({
                message: "Parcel not found with id " + req.params.parcelID
            });
        }
        res.send(parcel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Parcel or truck ID not found"
            });
        }
        return res.status(500).send({
            message: "Error updating parcel with id " + req.params.parcelID
        });
    });
};
