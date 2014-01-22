'use strict';

// Module dependencies.
var express 	= require('express')
,	passport 	= require('passport')
, 	mongoose 	= require('mongoose')
, 	logger 		= require('mean-logger')
, 	fs			= require('fs')
, 	path 		= require('path')

,	env 		= process.env.NODE_ENV || 'development'
, 	config		= require('./config/config')
,	auth		= require('./config/middlewares/authorization');

// BD Connection
var db = mongoose.connect(config.db);

// BD Models
var modelsPath = path.join(config.root, '/app/models/');
fs.readdirSync(modelsPath).forEach(function(file) {
	require(modelsPath + file);
});

// Express config settings
var app = express();
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport, auth);

// Start app by listening at port and logger 
app.listen(config.port, function() {
	console.log('Express server started on port ' + config.port);	
});

logger.init(app, passport, mongoose);

exports = module.exports = app;
