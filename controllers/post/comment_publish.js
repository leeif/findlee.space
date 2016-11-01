var util = require('util');
var Base = require('../base_controller');
var Manager = require('../../manager');

function CommentPublish() {
  Base.call(this);
  this.name = 'CommentPublish';
}

util.inherits(CommentPublish, Base);

CommentPublish.prototype.run = function(req, res, next) {
  CommentPublish.super_.prototype.run.call(this, req, res);
};

module.exports = CommentPublish;