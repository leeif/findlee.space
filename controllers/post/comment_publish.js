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
  Manager.Post(req.db).addComment(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
      });
    }
  });
};

module.exports = CommentPublish;