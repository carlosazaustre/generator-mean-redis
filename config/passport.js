'use strict';

var mongoose 			= require('mongoose')
,	TwitterStrategy 	= require('passport-twitter')
,	FacebookStrategy 	= require('passport-facebook')
, 	User				= mongoose.model('User');

module.exports = function(passport) {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findeOne({
			_id : id
		}, function(err, user) {
			done(err, user);
		})
	});

	// Twitter Strategy (Login and Sign-up with Twitter)
	passport.use(new TwitterStrategy({
		consumerKey 	: '',
		consumerSecret 	: '',
		callbackURL 	: ''
	},
	function(token, tokenSecret, profile, done) {
		User.findOne({
			'twitter.id_str': profile.id
		}, function(err, user) {
			if(err) {
				return done(err);
			}
			if(!user) {
				user = new User({
					name 	: profile.displayName,
					username: profile.username,
					provider: 'twitter',
					twitter : profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err);
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		});
	}));

	// Facebook Strategy (Login and Sign-up with Facebook)
	passport.use(new FacebookStrategy({
		clientID 	: '',
		clientSecret: '',
		callbackURL : ''
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOne({
			'facebook.id' : profile.id
		}, function(err, user) {
			if(err) {
				return done(err);
			}
			if(!user) {
				user = new User({
					name 	: profile.displayName,
					email 	: profile.emails[0].value,
					username: profile.username,
					provider: 'facebook',
					facebook: profile._json
				});
				user.save(function(err) {
					if(err) {
						console.log(err);
					}
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		});
	}));
};