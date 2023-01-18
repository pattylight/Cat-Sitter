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



//create cat Schema & model
const CatSchema = new Schema({
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

const Cat = mongoose.model('cat', CatSchema);

module.exports = Cat;

