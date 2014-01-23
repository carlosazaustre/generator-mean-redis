'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt, {
		pattern: 'grunt-*'
	});

	grunt.initConfig({

		// Project configuration
		pkg: grunt.file.readJSON('package.json'),

		stylus: {
			compile: {
				options: {
					paths: ['app/stylus/**/*.styl'],
					'include css': true
				},
				files: {
					'public/css/style.css': 'app/stylus/main.styl'
				}
			}
		},

		watch: {
			css: {
				files: 'app/stylus/**',
				tasks: ['stylus'],
				options: {
					livereload: true
				}
			}
		},

		jshint: {
			all: {
				src: ['gruntfile.js','server.js','config/**/*.js', 'app/**/*.js','public/js/**/*.js','test/**/*.js'],
				options: {
					jshintrc: true
				}
			}
		},

		bower: {
			install: {
				options: {
					targetDir: 'public/vendor',
					layout: 'byComponent',
					install: true,
					verbose: true,
					cleanBowerDir: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}

	});

	// Bower Task and Stylus proccesor
	grunt.registerTask('install', ['bower', 'stylus']);

	// Test Task
	grunt.registerTask('test', ['jshint']);

	// Start server and concurrent
	grunt.registerTask('default', ['jshint', 'concurrent']);

};