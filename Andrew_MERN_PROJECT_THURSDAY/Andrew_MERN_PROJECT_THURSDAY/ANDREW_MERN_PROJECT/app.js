const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//connect to mongodb. Define the database used here...
mongoose.connect("mongodb://localhost/projectdb");
mongoose.Promise = global.Promise;

//---Middleware ---
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//initialise routes
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
	res.status(422).send({error: err.message});
});
//-----------------

//GET request
app.get('/*', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

//Listen for requests on 8082
const PORT = 8084;
const server = app.listen(PORT, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});
