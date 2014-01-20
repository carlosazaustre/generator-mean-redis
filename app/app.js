'use strict';

var express = require('express')
,	cons	= require('consolidate');

module.exports = function(app) {

	app.use(express.compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/)
				.test(res.getHeader('Content-Type');
		}
		level: 9
	}));

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
		app.use(express.session({}));
	});

};