'use strict';

// Module dependencies.
var express 	= require('express')
,	fs			= require('fs')
,	path 		= require('path')
,	mongoose	= require('mongoose');

var app = express();

// Load configurations
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/config');

// Express settings
require('./config/express')(app);

// DB Connection
var db = mongoose.connect(config.db);

// Models
var modelsPath = path.join(__dirname, 'app/models');
var walk = function(path) {
	fs.readdirSync(path).forEach(function(file) {
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);
		if(stat.isFile()) {
			if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
		} else if(stat.isDirectory()) {
			walk(newPath);
		}
	});
};
walk(modelsPath);

// Routes
var routesPath = path.join(__dirname, 'app/routes');
var walk = function(path) {
	fs.readdirSync(path).forEach(function(file) {
		var newPath = path + '/' + file;
		var stat = fs.statSync(newPath);
		if(stat.isFile()) {
			if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app); //passport
            }
        // Middlewares is not a route itself    
		} else if(stat.isDirectory() && file !== 'middlewares') {
			walk(newPath);
		}
	});
};
walk(routesPath); 

// Start the server and app.
app.listen(app.get('port'), function() {
	console.log('Express App listening at port ' + app.get('port'));
});

exports = module.exports = app;