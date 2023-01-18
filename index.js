const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//setup express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://pattylight:pattylight1234@cluster0.mejtv47.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true });
app.use(express.static('public'));

app.use(bodyParser.json());

//start routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});

});

//listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});


