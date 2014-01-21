'use strict';

module.exports = function(app, passport, auth) {

	// User Routes
	var users = require('../app/controllers/users');
	app.get('/login', users.login);
	app.get('/register', users.register);
	app.get('/logout', users.logout);

	// Users API
	app.get('/users/me', users.me);
	app.get('/users/:userId', users.profile);

	// Twitter OAuth Routes
	app.get('/auth/twitter', passport.authenticate('twitter', {
		failureRedirect: '/login'
	}), users.login);

	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/login'
	}), users.authCallback);

	// Facebook OAuth Routes
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['email', 'user_about_me'],
		failureRedirect: '/login'
	}), users.login);

	app.get('/auth/facebook/callback', passport.authenticate('facebook',  {
		failureRedirect: '/login'
	}), users.authCallback);

	// Home Route
	var index = require('../app/controllers/index');
	app.get('/', index.render);

};