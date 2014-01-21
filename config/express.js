'use strict';

var express = require('express')
,	cons	= require('consolidate');

module.exports = function(app) {

	app.use(express.compress());

	app.use(express.favicon());
	app.use(express.static(__dirname + '/public'));

	app.engine('.html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/app/views');

	app.enable('json callback');

	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		//app.use(express.session());
	});

};