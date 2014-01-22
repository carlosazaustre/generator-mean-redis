'use strict';

var express = require('express')
,	path 	= require('path')
,	swig	= require('swig');

module.exports = function(app) {
	app.use(express.logger('dev'));

	app.use(express.favicon());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, '../public')));

	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', path.join(__dirname, '../app/views'));

	app.set('port', 3000);

	app.enable('jsonp callback');
};