'use strict';

var path 		= require('path')
,	url 		= require('url')
,	rootPath 	= path.normalize(__dirname + '/../..')
,	REDISTOGO 	= url.parse(process.env.REDISTOGO_URL || 'http://localhost:6379')
,	REDISHOST	= REDISTOGO.hostname
,	REDISPORT 	= REDISTOGO.port
,	REDISAUTH 	= (process.env.REDISTOGO_URL ? REDISTOGO.auth.split(':')[1] : undefined)
,	MONGO_URL 	= (process.env.MONGOHQ_URL || 'mongodb://localhost:27017/mean-dev');

module.exports = {
	root 			: rootPath,
	port			: process.env.PORT || 3000,
	db				: MONGO_URL,
	sessionStore 	: {
		host: REDISHOST,
		port: REDISPORT,
		auth: REDISAUTH
	}
} 