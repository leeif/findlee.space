var util = require('util');
var Base = require('../BaseController');
var Manager = require('../../manager');

function BlogArticle() {
  Base.call(this);
}

util.inherits(BlogArticle, Base);

BlogArticle.prototype.run = function(req, res, next) {
  BlogArticle.super_.prototype.run.call(this, req, res);
  Manager.Get(req.db).getArticle(req.params.cid, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.status(200).render('blog/blogArticle.html', {
        article: result.article,
        host: req.headers.host
      });
    }
  });
};

module.exports = BlogArticle;