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
		},

		bower: {
			install: {
				options: {
					targetDir: './public/vendor',
					layout: 'byComponent',
					install: true,
					verbose: true,
					cleanBowerDir: true
				}
			}
		}

	});

	// Test Task
	grunt.registerTask('test', ['jshint']);

	// Bower Task
	grunt.registerTask('install', ['bower']);

};