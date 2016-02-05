// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'BART JSON API' });   
});

router.get('/etd', function(req, res) {
	var url = require('url');
    var Client = require('node-rest-client').Client;
    var client = new Client();

    var urlParts = url.parse(req.url, true);
    client.get("http://api.bart.gov/api/etd.aspx" + urlParts.search, function (data, response) {
		var parser = require('xml2json');
        var json = parser.toJson(data, {object: true});
        console.log(json);
        res.json(json);
    });
});

//?cmd=stns&key=MW9S-E7SL-26DU-VV8V - list of all of the BART stations
router.get('/stn', function(req, res) {
	var url = require('url');
    var Client = require('node-rest-client').Client;
    var client = new Client();

    var urlParts = url.parse(req.url, true);
    client.get("http://api.bart.gov/api/stn.aspx" + urlParts.search, function (data, response) {
		var parser = require('xml2json');
        var json = parser.toJson(data, {object: true});
        console.log(json);
        res.json(json);
    });
});

//Returns the current BART Service Advisories (BSA).
//?cmd=bsa&key=MW9S-E7SL-26DU-VV8V - BART Service Advisories (BSA)
//?cmd=elev&key=MW9S-E7SL-26DU-VV8V - Elevator Status
router.get('/bsa', function(req, res) {
	var url = require('url');
    var Client = require('node-rest-client').Client;
    var client = new Client();

    var urlParts = url.parse(req.url, true);
    client.get("http://api.bart.gov/api/bsa.aspx" + urlParts.search, function (data, response) {
		var parser = require('xml2json');
        var json = parser.toJson(data, {object: true});
        console.log(json);
        res.json(json);
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
