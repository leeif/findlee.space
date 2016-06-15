'use strict';

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/app')[env];
var Redis = require("ioredis");
var redis = new Redis({
  port: config.redis.port,
  password: config.redis.password,
});
var models = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file !== basename);
  })
  .forEach(function(file) {
    var name = file.split('.js')[0];
    var model = require(path.join(__dirname, file));
    models[name] = new model(redis, config.redis.prefix);
  });

module.exports = models;
