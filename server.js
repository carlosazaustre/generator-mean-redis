'use strict';

// Module dependencies.
var express 	= require('express');

var app = express();

// Express settings
require('./config/express')(app);

app.get('/', function(req, res) {
	res.render('index', {});
});

app.listen(app.get('port'), function() {
	console.log('Express App listening at port ' + app.get('port'));
});

exports = module.exports = app;