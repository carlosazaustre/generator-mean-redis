'use strict';

var express = require('express'),
	path	= require('path'),
	swig	= require('swig'),
	helpers	= require('view-helpers'),
	config	= require('./config');

module.exports = function(app, passport) {
	app.set('showStackError', true);
	app.use(express.logger('dev'));
	app.locals.pretty = true;
	app.use(express.compress());

	// Views configure
	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', path.join(__dirname, '../app/views'));


	app.enable('jsonp callback');

	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.urlencoded());
		app.use(express.json());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		
		// session

		app.use(helpers(config.app.name));

		app.use(passport.initialize());
		app.use(passport.session());

		app.use(app.router);

		app.use(express.favicon());
		app.use(express.static(path.join(__dirname, '../public')));

		app.set('port', config.port);
	});
};