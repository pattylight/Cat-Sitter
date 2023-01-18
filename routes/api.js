const express = require('express');
const Pirate = require('../models/pirate');
const router = express.Router();



//list of pirates from database
router.get('/pirates',function(req, res, next){
    Pirate.find({}).then(function(pirates){
        res.send(pirates);
    });

    Pirate.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
       });
});

//add a new pirate to database
router.post('/pirates',function(req, res, next){
    Pirate.create(req.body).then(function(pirate){
        res.send(pirate);
     }).catch(next);

});

//update a pirate in database
router.put('/pirates/:id',function(req, res, next){
    Pirate.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(){
        Pirate.findOne({_id: req.params.id}).then(function(pirate){
            res.send(pirate);
        });
    });  
});

//delete a pirate from database
router.delete('/pirates/:id',function(req, res, next){
    Pirate.findByIdAndRemove({_id: req.params.id},)
    .then(function(pirate){
        res.send(pirate);
    });
    
});

module.exports = router;