var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function BlogPublish() {
  Base.call(this);
}

util.inherits(BlogPublish, Base);

BlogPublish.prototype.run = function(req, res, next) {
  BlogPublish.super_.prototype.run.call(this, req, res);
  Manager.Post(req.db).publishArticle(req.body, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({
        redirect: result.redirect
      });
    }
  });
};

module.exports = BlogPublish;