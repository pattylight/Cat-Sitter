const express = require('express');
const Cat = require('../models/cat');
const router = express.Router();



//list of cats from database
router.get('/cats',function(req, res, next){
   

    Cat.aggregate().near({
        near:  {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"
        }).then(function (cats) {
            res.send(cats);
        });
});

//add a new cat to database
router.post('/cats',function(req, res, next){
    Cat.create(req.body).then(function(cat){
        res.send(cat);
     }).catch(next);

});

//update a cat in database
router.put('/cats/:id',function(req, res, next){
    Cat.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(){
        Cat.findOne({_id: req.params.id}).then(function(cat){
            res.send(cat);
        });
    });  
});

//delete a cat from database
router.delete('/cats/:id',function(req, res, next){
    Cat.findByIdAndRemove({_id: req.params.id},)
    .then(function(cat){
        res.send(cat);
    });
    
});

module.exports = router;