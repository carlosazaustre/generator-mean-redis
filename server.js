// server.js

'use strict';

// Module dependencies.
var express = require('express')
,	passport = require('passport')
, 	mongoose = require('mongoose');

var app = express();

// Express config settings
require('./app/app')(app)

var port = 3000;
app.listen(port);
console.log('Express server started on port ' + port);

exports = module.exports = app;
