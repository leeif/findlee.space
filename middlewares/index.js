'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var middlewares = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var Middleware = require('./' + file);
    var middleware = new Middleware();
    middlewares[middleware.name] = middleware[middleware.name];
  });

module.exports = middlewares;
