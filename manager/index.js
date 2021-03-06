'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var utils = require('../tool/utils');
var manager = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
      (file !== 'base_manager.js') &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var name = file.split('_manager.js')[0];
    name = utils.capitalizeFirstLetter(name);
    manager[name] = require('./' +file)();
  });

module.exports = manager;
