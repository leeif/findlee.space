var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager/PostManager');

function BlogPublish() {
  Base.call(this);
}

util.inherits(BlogPublish, Base);

BlogPublish.prototype.run = function(req, res, next) {
  var manager = Manager.getInstance(req.db, req.redis);
  var statusCode;
  BlogPublish.super_.prototype.run.call(this, req, res);
  manager.publish(req.body, function(err, result) {
    if (err) {
      statusCode = 500;
    } else {
      statusCode = 200;
    }
    res.status(statusCode).json({
      cid: result.insertId
    });
  });
};

module.exports = BlogPublish;