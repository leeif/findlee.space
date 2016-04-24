'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var manager = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
      (file !== 'BaseManager.js') &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var name = file.split('Manager.js')[0];
    manager[name] = require('./' +file)();
  });

module.exports = manager;
