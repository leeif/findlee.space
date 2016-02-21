var util = require('util');
var Base = require('./BaseController');
var Manager = require('../manager/BlogManager');

function BlogArticle() {
  Base.call(this);
}

util.inherits(BlogArticle, Base);

BlogArticle.prototype.run = function(req, res, next) {
  BlogArticle.super_.prototype.run.call(this, req, res);
  var manager = Manager.getInstance(req.db, req.redis);
  manager.getBlog(req.params.cid, function(err, blog) {
    if (err) {
      next(err);
    } else {
      res.status(200).render('blog/blogArticle.html', {
        blog: blog,
        host: req.headers.host
      });
    }
  });
};

module.exports = BlogArticle;