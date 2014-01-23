'use strict';

var mongoose	= require('mongoose'),
	User		= mongoose.model('User');

exports.authCallback = function(req, res) {
	res.redirect('/');
};

exports.login = function(req, res) {
	res.render('users/login', {
		title: 'Login'
	});
};

exports.register = function(req, res) {
	res.render('users/register', {
		title: 'Register'
	});
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.session = function(req, res) {
	res.redirect('/');
};

exports.me = function(req, res) {
	res.jsonp(req.user || null);
};

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
				return next(new Error('Failed to load user ' + id));
			}
			req.profile = user;
			next();
		});
};