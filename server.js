'use strict';

// Module dependencies.
var express 	= require('express')
,	passport 	= require('passport')
, 	mongoose 	= require('mongoose')
, 	logger 		= require('mean-logger');

// TODO añadir config, auth, y ENV

// TODO añadir conexión a base de datos

// TODO añadir modelos


var app = express();

// Express config settings
require('./config/express')(app, passport);
require('./config/passport')(passport);
// TODO añadir rutas

var port = 3000;
app.listen(port, function() {
	console.log('Express server started on port ' + port);	
});

// Logger
logger.init(app, passport, mongoose);

exports = module.exports = app;
