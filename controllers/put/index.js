'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var controllers = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var Controller = require('./' + file);
    var controller = new Controller();
    controllers[controller.name] = controller;
  });

module.exports = controllers;