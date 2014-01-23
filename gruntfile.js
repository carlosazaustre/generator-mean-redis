'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt, {
		pattern: 'grunt-*'
	});

	grunt.initConfig({

		// Project configuration
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: {
				src: ['gruntfile.js','server.js','config/**/*.js', 'app/**/*.js','public/**/*.js','test/**/*.js'],
				options: {
					jshintrc: true
				}
			}
		}

	});

	// Test Task
	grunt.registerTask('test', ['jshint']);

};