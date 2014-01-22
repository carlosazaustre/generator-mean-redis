'use strict';

var express 	= require('express')
,	swig		= require('swig')
,	path 		= require('path')
,	config 		= require('./config');

module.exports = function(app, passport) {

	var RedisStore = require('connect-redis')(app);

	//app.use(express.compress());

	app.use(express.favicon());
	app.use(express.static(path.join(config.root, '/public')));

	app.engine('.html', swig.renderFile);
	app.set('view engine', 'html');
	app.set('views', path.join(config.root, '/app/views'));
	app.set('view cache', false);

	app.enable('json callback');

	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.session({
			key: config.session.key,
			secret: config.session.secret,
			store: new RedisStore({})
		}));

		app.use(passport.initialize());
		app.use(passport.session());
		
		app.use(app.router);
	});

};