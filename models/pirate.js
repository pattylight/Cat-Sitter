const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }

});



//create pirate Schema & model
const PirateSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    }, 
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema

});

const Pirate = mongoose.model('pirate', PirateSchema);

module.exports = Pirate;

