'use strict';

module.exports = {
	port	: process.env.PORT || 3000,
	db		: process.env.MONGOHQ_URL,
	session : {
		secret: 'MEAN'
	}
};