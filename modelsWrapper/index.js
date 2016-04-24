'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var wrapper = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = file.split('Wrapper.js')[0];
    wrapper[model] = require('./' +file)();
  });

module.exports = wrapper;
