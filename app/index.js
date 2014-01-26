'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MeanRedisGenerator = module.exports = function MeanRedisGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
        skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MeanRedisGenerator, yeoman.generators.Base);

MeanRedisGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
      {
        type: 'confirm',
        name: 'herokuIntegration',
        message: 'Are you planning to deply this project on Heroku?',
        default: false
      },
    ];

  this.prompt(prompts, function (props) {
    this.herokuIntegration = props.herokuIntegration;

    cb();
  }.bind(this));
};

MeanRedisGenerator.prototype.app = function app() {
    // Public
    this.mkdir('public');
    this.mkdir('public/img');
    this.mkdir('public/js');
    this.mkdir('public/css');

    // Express settings
    this.mkdir('config');
    this.mkdir('config/env');

    // App
    this.mkdir('app');
    this.mkdir('app/controllers');
    this.mkdir('app/models');
    this.mkdir('app/routes');
    this.mkdir('app/stylus');
    this.mkdir('app/views');

    this.directory('public');
    this.directory('config');
    this.directory('routes');
    this.directory('app');
};

MeanRedisGenerator.prototype.projectfiles = function projectfiles() {
    // Dotfiles
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

    // Package
    this.copy('_package.json', 'package.json');

    // Front
    this.copy('_bower.json', 'bower.json');
    this.copy('_gruntfile.js', 'gruntfile.js');

    // Express
    this.copy('_server.js', 'server.js');
    this.copy('_README.md', 'README.md');

    if(this.herokuIntegration) {
        this.copy('_Procfile', 'Procfile');
        this.copy('_env', '.env');
    }
};
