'use strict';

var mongoose 	= require('mongoose')
,	User		= mongoose.model('User');

// Auth Callback
exports.authCallback = function(req, res, next) {
	res.redirect('/');
};

// Login Form
exports.login = function(req, res) {
	res.render('users/login', {
		title: 'Login',
	});
};

// Register Form
exports.register = function(req, res) {
	res.render('users/register', {
		title: 'Register'
	});
};

// Logout
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

// Session
exports.session = function(req, res) {
	res.redirect('/');
};

// User Profile
exports.profile = function(req, res) {
	var user = req.profile;

	res.render('users/profile', {
		title: user.name,
		user: user
	});
};

// Send User
exports.me = function(req, res) {
	res.jsonp(req.user || null);
};

// Find user by id
exports.user = function(req, res, next, id) {
	User
		.findOne({
			_id: id
		})
		.exec(function(err, user) {
			if(err) {
				return next(err);
			}
			if(!user) {
				return next(new Error('Failed to load User' + id));
			}
			req.profile = user;
			next();
		});	
};