'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		// Project configuration
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: {
				src: ['gruntfile.js','server.js','app/**/*.js','public/**/*.js','test/**/*.js'],
				options: {
					jshintrc: true
				}
			}
		}

	});

	// Load NPM tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Test Task
	grunt.registerTask('test', ['jshint']);

};