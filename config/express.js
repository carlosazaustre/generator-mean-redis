'use strict';

var express = require('express')
,	path 	= require('path')
,	swig	= require('swig')
,	config 	= require('./config');

module.exports = function(app) {
	app.use(express.logger('dev'));	
	//showstack error
	//compress

	app.use(express.favicon());
	app.use(express.static(path.join(__dirname, '../public')));

	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', path.join(__dirname, '../app/views'));

	app.set('port', config.port);

	app.enable('jsonp callback');

	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		// session
		// passport session
		app.use(app.router);
	});
};