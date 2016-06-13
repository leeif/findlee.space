var util = require('util');
var Base = require('../base_controller');

function Welcome(){
  Base.call(this);
  this.name = 'Welcome';
}

util.inherits(Welcome, Base);

Welcome.prototype.run = function(req, res, next){
  Welcome.super_.prototype.run.call(this, req, res, next);
  res.status(200).render('index.html');
};

module.exports = Welcome;
